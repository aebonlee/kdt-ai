import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { isAdmin } from '../config/admin'
import { listPosts, createPost } from '../data/db'

const fmt = (s) => new Date(s).toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' })

const TABS = [
  { key: 'qna', label: 'Q&A 게시판' },
  { key: 'notice', label: '공지사항' },
]

export default function Board() {
  const { user } = useAuth()
  const [tab, setTab] = useState('qna')
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const load = async () => {
    setLoading(true)
    setErr(null)
    try {
      setPosts(await listPosts(tab))
    } catch (e) {
      setErr(e.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    load()
    setShowForm(false)
  }, [tab])

  const canWrite = tab === 'qna' ? !!user : isAdmin(user)

  const submit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    try {
      await createPost({ type: tab, title: title.trim(), body, user })
      setTitle('')
      setBody('')
      setShowForm(false)
      load()
    } catch (e) {
      alert('등록 실패: ' + e.message)
    }
  }

  return (
    <div>
      <div className="page-header-ed">
        <div className="container">
          <span className="eyebrow">Community</span>
          <h1>게시판</h1>
          <p>
            <span style={{ display: 'block' }}>질문과 답변을 나누고 공지를 확인하세요.</span>
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
            {TABS.map((t) => (
              <button key={t.key} className={`btn ${tab === t.key ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setTab(t.key)}>
                {t.label}
              </button>
            ))}
            {canWrite && (
              <button className="btn btn-cta" style={{ marginLeft: 'auto' }} onClick={() => setShowForm((v) => !v)}>
                {showForm ? '닫기' : '글쓰기'}
              </button>
            )}
          </div>

          {showForm && (
            <form onSubmit={submit} className="card" style={{ marginBottom: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목"
                style={{ padding: 12, border: '1px solid var(--line-strong)', borderRadius: 'var(--radius)', fontFamily: 'inherit', fontSize: 15 }}
              />
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="내용"
                rows={5}
                style={{ padding: 12, border: '1px solid var(--line-strong)', borderRadius: 'var(--radius)', fontFamily: 'inherit', fontSize: 14, resize: 'vertical' }}
              />
              <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>등록</button>
            </form>
          )}

          {err && (
            <div className="box box-tips" style={{ marginBottom: 16 }}>
              <div className="box-h">불러오지 못했습니다</div>
              <p style={{ fontSize: 13, color: 'var(--ink-soft)' }}>
                {err} — Supabase 테이블(kdt_posts) 설정이 필요할 수 있습니다.
              </p>
            </div>
          )}

          {loading ? (
            <p style={{ color: 'var(--ink-soft)' }}>불러오는 중…</p>
          ) : posts.length === 0 ? (
            <p style={{ color: 'var(--ink-soft)' }}>아직 게시글이 없습니다.</p>
          ) : (
            <div style={{ border: '1px solid var(--line)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
              {posts.map((p) => (
                <Link
                  key={p.id}
                  to={`/board/${p.id}`}
                  className="session-row"
                  style={{ padding: '14px 16px', borderTop: '1px solid var(--navy-100)' }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                    {tab === 'notice' && <span className="chip chip-region pangyo" style={{ fontSize: 11 }}>공지</span>}
                    <span className="title" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</span>
                  </span>
                  <span style={{ display: 'flex', gap: 12, color: 'var(--ink-soft)', fontSize: 13, flex: '0 0 auto' }}>
                    <span>{p.author_name}</span>
                    <span>{fmt(p.created_at)}</span>
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
