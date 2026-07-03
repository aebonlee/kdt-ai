import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { isAdmin } from '../config/admin'
import { getPost, deletePost, listComments, addComment, deleteComment } from '../data/db'

const fmt = (s) => new Date(s).toLocaleString('ko-KR', { dateStyle: 'medium', timeStyle: 'short' })

export default function BoardDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [body, setBody] = useState('')
  const [err, setErr] = useState(null)

  const loadComments = async () => {
    try {
      setComments(await listComments(id))
    } catch {
      /* 댓글 테이블 미설정 시 무시 */
    }
  }

  useEffect(() => {
    // id 변경 시 컴포넌트가 재마운트되지 않으므로 이전 글의 상태를 먼저 비운다.
    // (안 그러면 이전 글이 잠깐 노출되거나, 에러났던 글의 err 가 남아 정상 글도 에러 화면이 됨)
    setPost(null)
    setErr(null)
    setComments([])
    getPost(id).then(setPost).catch((e) => setErr(e.message))
    loadComments()
  }, [id])

  const canManage = (authorId) => user && (user.id === authorId || isAdmin(user))

  const submitComment = async (e) => {
    e.preventDefault()
    if (!body.trim()) return
    try {
      await addComment({ postId: id, body: body.trim(), user })
      setBody('')
      loadComments()
    } catch (e) {
      alert('댓글 등록 실패: ' + e.message)
    }
  }

  const removePost = async () => {
    if (!confirm('이 글을 삭제할까요?')) return
    try {
      await deletePost(id)
      navigate('/board')
    } catch (e) {
      alert('삭제 실패: ' + e.message)
    }
  }

  if (err) {
    return (
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--ink-soft)' }}>{err}</p>
          <Link to="/board" className="back-link" style={{ marginTop: 12 }}>← 게시판으로</Link>
        </div>
      </section>
    )
  }
  if (!post) {
    return (
      <section className="section">
        <div className="container" style={{ color: 'var(--ink-soft)' }}>불러오는 중…</div>
      </section>
    )
  }

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 760 }}>
        <Link to="/board" className="back-link">← 게시판</Link>

        <div className="detail-card">
          <div className="detail-meta">
            {post.type === 'notice' && <span className="chip chip-region pangyo">공지</span>}
            <span className="chip chip-cat">{post.author_name}</span>
            <span style={{ fontSize: 13, color: 'var(--ink-soft)' }}>{fmt(post.created_at)}</span>
          </div>
          <h1 style={{ marginTop: 4 }}>{post.title}</h1>
          <p style={{ whiteSpace: 'pre-wrap', marginTop: 16, color: 'var(--navy-700)', lineHeight: 1.8 }}>{post.body}</p>

          {canManage(post.author_id) && (
            <button onClick={removePost} className="btn btn-ghost" style={{ marginTop: 20, fontSize: 13, padding: '8px 16px' }}>
              삭제
            </button>
          )}
        </div>

        {/* 댓글 */}
        <div style={{ marginTop: 28 }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--navy-800)', marginBottom: 12 }}>
            댓글 {comments.length}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {comments.map((c) => (
              <div key={c.id} className="card" style={{ padding: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                  <strong style={{ fontSize: 14, color: 'var(--navy-800)' }}>{c.author_name}</strong>
                  <span style={{ fontSize: 12, color: 'var(--ink-soft)' }}>{fmt(c.created_at)}</span>
                </div>
                <p style={{ whiteSpace: 'pre-wrap', marginTop: 6, fontSize: 14, color: 'var(--navy-700)' }}>{c.body}</p>
                {canManage(c.author_id) && (
                  <button
                    onClick={async () => {
                      try {
                        await deleteComment(c.id)
                      } catch (e) {
                        alert('댓글 삭제 실패: ' + e.message)
                      }
                      loadComments()
                    }}
                    style={{ marginTop: 6, background: 'none', border: 'none', color: 'var(--ink-soft)', fontSize: 12, cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    삭제
                  </button>
                )}
              </div>
            ))}
          </div>

          {user ? (
            <form onSubmit={submitComment} style={{ marginTop: 14, display: 'flex', gap: 8 }}>
              <input
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="댓글을 입력하세요"
                style={{ flex: 1, padding: 12, border: '1px solid var(--line-strong)', borderRadius: 'var(--radius)', fontFamily: 'inherit', fontSize: 14 }}
              />
              <button type="submit" className="btn btn-primary">등록</button>
            </form>
          ) : (
            <p style={{ marginTop: 14, fontSize: 13, color: 'var(--ink-soft)' }}>
              <Link to="/login" style={{ color: 'var(--gold)', fontWeight: 700 }}>로그인</Link> 후 댓글을 작성할 수 있습니다.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
