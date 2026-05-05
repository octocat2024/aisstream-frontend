import './DataFlowIndicator.css'

export default function DataFlowIndicator({ active }: { active: boolean; pulse?: number }) {  return (
    <div className="data-flow">
      <div className="flow-node">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
          <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
        <span>Backend</span>
      </div>
    <div className="flow-track">
    <div className={`flow-line ${active ? 'active' : ''}`} />
    {active && (
        <>
        <div className="flow-dot" style={{ animationDelay: '0s' }} />
        <div className="flow-dot" style={{ animationDelay: '0.67s' }} />
        <div className="flow-dot" style={{ animationDelay: '1.33s' }} />
        </>
    )}
    </div>
      <div className="flow-node">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
          <circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
        </svg>
        <span>Frontend</span>
      </div>
    </div>
  )
}