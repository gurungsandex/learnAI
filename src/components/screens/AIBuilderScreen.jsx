/**
 * AIBuilderScreen.jsx
 * Visual AI agent builder using IF/THEN blocks.
 * Users tap blocks to build rules, then test their agent in a chat preview.
 *
 * HOW IT WORKS:
 *   Each "rule" is: { trigger: string, response: string }
 *   When the user types in the preview chat, the agent checks all rules
 *   and replies with the matching response (or a default).
 */
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useGame } from '../../context/GameContext'
import { ByteCharacter } from '../ui/Character'

// ── Available trigger keywords ─────────────────────────────────
const TRIGGER_BLOCKS = [
  { id: 't1', label: 'says HELLO',     keyword: 'hello',    emoji: '👋', color: '#3B82F6' },
  { id: 't2', label: 'asks for HELP',  keyword: 'help',     emoji: '🆘', color: '#3B82F6' },
  { id: 't3', label: 'says THANKS',    keyword: 'thanks',   emoji: '🙏', color: '#3B82F6' },
  { id: 't4', label: 'asks "what is"', keyword: 'what is',  emoji: '❓', color: '#3B82F6' },
  { id: 't5', label: 'says JOKE',      keyword: 'joke',     emoji: '😄', color: '#3B82F6' },
  { id: 't6', label: 'says BYE',       keyword: 'bye',      emoji: '👋', color: '#3B82F6' },
  { id: 't7', label: 'asks FAVORITE',  keyword: 'favorite', emoji: '⭐', color: '#3B82F6' },
  { id: 't8', label: 'says COOL',      keyword: 'cool',     emoji: '😎', color: '#3B82F6' },
]

// ── Default rule templates to get users started ─────────────────
const DEFAULT_RULES = [
  { id: 'r1', trigger: 'hello', triggerLabel: 'says HELLO', triggerEmoji: '👋', response: "Hi there! I'm {agentName}! How can I help you today? 😊" },
  { id: 'r2', trigger: 'help',  triggerLabel: 'asks for HELP',  triggerEmoji: '🆘', response: "Of course! I'm here to help! What do you need? 🚀" },
]

export default function AIBuilderScreen() {
  const navigate  = useNavigate()
  const { state, setAgentName, setAgentBlocks, earnBadge } = useGame()

  const [tab,         setTab]         = useState('build')   // build | test
  const [agentNameInput, setAgentNameInput] = useState(state.agentName || 'Byte Jr')
  const [rules,       setRules]       = useState(
    state.agentBlocks?.length > 0 ? state.agentBlocks : DEFAULT_RULES
  )
  const [editingRule, setEditingRule] = useState(null)       // rule id being edited
  const [editText,    setEditText]    = useState('')
  const [showTriggerPicker, setShowTriggerPicker] = useState(false)
  const [pendingTrigger,    setPendingTrigger]    = useState(null)

  // ── Test chat state ────────────────────────────────────────
  const [chatMessages, setChatMessages] = useState([
    { from: 'agent', text: `Hi! I'm ${state.agentName}! Try talking to me! 😊` }
  ])
  const [inputText, setInputText]  = useState('')
  const chatEndRef                 = useRef(null)

  // Scroll to bottom when chat updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  // ── Save to context whenever rules change ──────────────────
  useEffect(() => {
    setAgentBlocks(rules)
    if (rules.length >= 5) earnBadge('builder_pro')
  }, [rules, setAgentBlocks, earnBadge])

  // ── Agent name save ────────────────────────────────────────
  function saveAgentName() {
    setAgentName(agentNameInput.trim() || 'Byte Jr')
    setChatMessages([{ from: 'agent', text: `Hi! I'm ${agentNameInput.trim() || 'Byte Jr'}! Try talking to me! 😊` }])
  }

  // ── Add a new rule ─────────────────────────────────────────
  function startAddRule(trigger) {
    const newRule = {
      id: `r${Date.now()}`,
      trigger: trigger.keyword,
      triggerLabel: trigger.label,
      triggerEmoji: trigger.emoji,
      response: '',
    }
    setRules(r => [...r, newRule])
    setEditingRule(newRule.id)
    setEditText('')
    setShowTriggerPicker(false)
    setPendingTrigger(null)
  }

  // ── Save response text ─────────────────────────────────────
  function saveResponse(ruleId) {
    if (!editText.trim()) return
    setRules(r => r.map(rule =>
      rule.id === ruleId ? { ...rule, response: editText.trim() } : rule
    ))
    setEditingRule(null)
    setEditText('')
  }

  // ── Delete a rule ──────────────────────────────────────────
  function deleteRule(ruleId) {
    setRules(r => r.filter(rule => rule.id !== ruleId))
  }

  // ── Agent replies in test mode ─────────────────────────────
  function sendMessage() {
    const text = inputText.trim()
    if (!text) return

    setChatMessages(m => [...m, { from: 'user', text }])
    setInputText('')

    // Find matching rule
    const lower = text.toLowerCase()
    const matched = rules.find(rule => lower.includes(rule.trigger.toLowerCase()) && rule.response)

    const reply = matched
      ? matched.response.replace('{agentName}', agentNameInput)
      : "Hmm, I'm not sure about that yet! My creator is still teaching me! 🤔"

    setTimeout(() => {
      setChatMessages(m => [...m, { from: 'agent', text: reply }])
    }, 600)
  }

  const completedRules = rules.filter(r => r.response.trim().length > 0)

  return (
    <div className="min-h-dvh bg-bg-deep flex flex-col">

      {/* ── Top bar ── */}
      <div className="bg-bg-panel border-b-2 border-purple-dark px-4 py-3 flex items-center gap-3 sticky top-0 z-40">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('/home')}
          className="w-9 h-9 rounded-full bg-purple-dark border-2 border-purple-mid flex items-center justify-center text-white font-comic text-lg"
        >
          ←
        </motion.button>
        <div className="flex-1">
          <div className="font-comic text-gold text-xl leading-none">AI BUILDER 🔨</div>
          <div className="font-body text-purple-light text-xs font-700">Build your own AI agent!</div>
        </div>
        <div className="xp-badge">{completedRules.length} rules</div>
      </div>

      {/* ── Tabs ── */}
      <div className="flex border-b-2 border-purple-dark">
        {['build', 'test'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-3 font-comic text-lg transition-colors
              ${tab === t
                ? 'text-gold border-b-4 border-gold bg-purple-dark'
                : 'text-purple-light'
              }`}
          >
            {t === 'build' ? '🔨 BUILD' : '💬 TEST'}
          </button>
        ))}
      </div>

      <div className="flex-1 flex flex-col px-4 py-4 overflow-y-auto gap-4">

        {/* ═══ BUILD TAB ═══ */}
        {tab === 'build' && (
          <>
            {/* ── Agent name ── */}
            <div className="card-comic">
              <label className="font-comic text-gold text-base block mb-2">🤖 Agent Name:</label>
              <div className="flex gap-2">
                <input
                  value={agentNameInput}
                  onChange={e => setAgentNameInput(e.target.value)}
                  onBlur={saveAgentName}
                  maxLength={20}
                  placeholder="Byte Jr"
                  className="flex-1 bg-bg-deep border-2 border-purple-mid rounded-comic px-3 py-2
                             font-body font-800 text-white outline-none focus:border-gold transition-colors"
                />
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={saveAgentName}
                  className="btn-gold px-4 text-base"
                >
                  SAVE
                </motion.button>
              </div>
            </div>

            {/* ── Byte explains ── */}
            <div className="flex items-start gap-3">
              <ByteCharacter emotion="thinking" size={56} />
              <div className="speech-bubble flex-1 bubble-tail-left text-sm">
                <span className="text-cyan font-900">Byte: </span>
                Add rules for your agent! Each rule says: <strong>"When someone [TRIGGER], reply with [RESPONSE]"</strong>
              </div>
            </div>

            {/* ── Rules list ── */}
            {rules.length === 0 && (
              <div className="text-center py-6 text-purple-light font-body font-700">
                No rules yet! Tap "+ ADD RULE" below to start!
              </div>
            )}

            {rules.map((rule, idx) => (
              <motion.div
                key={rule.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0  }}
                transition={{ delay: idx * 0.05 }}
                className="card-comic border-2"
                style={{ borderColor: rule.response ? '#4ADE80' : '#FBBF24' }}
              >
                {/* Trigger row */}
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="px-3 py-1 rounded-comic border-2 border-black font-comic text-sm text-black flex items-center gap-1"
                    style={{ backgroundColor: '#3B82F6' }}
                  >
                    <span>👤 WHEN someone {rule.triggerLabel}</span>
                  </div>
                  <div className="ml-auto">
                    <motion.button
                      whileTap={{ scale: 0.85 }}
                      onClick={() => deleteRule(rule.id)}
                      className="w-7 h-7 rounded-full bg-coral border-2 border-black flex items-center justify-center text-black font-comic text-sm"
                    >
                      ×
                    </motion.button>
                  </div>
                </div>

                {/* Arrow */}
                <div className="font-comic text-gold text-center text-sm mb-2">↓ THEN REPLY WITH</div>

                {/* Response */}
                {editingRule === rule.id ? (
                  <div className="flex flex-col gap-2">
                    <textarea
                      value={editText}
                      onChange={e => setEditText(e.target.value)}
                      placeholder={`Type what ${agentNameInput} says here... (Use {agentName} for the agent's name)`}
                      rows={3}
                      autoFocus
                      className="w-full bg-bg-deep border-2 border-gold rounded-comic px-3 py-2
                                 font-body text-white text-sm outline-none resize-none"
                    />
                    <div className="flex gap-2">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => saveResponse(rule.id)}
                        className="btn-green flex-1 text-base py-2"
                      >
                        SAVE ✓
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => { setEditingRule(null); if (!rule.response) deleteRule(rule.id) }}
                        className="btn-coral text-base py-2 px-4"
                      >
                        ✕
                      </motion.button>
                    </div>
                  </div>
                ) : (
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { setEditingRule(rule.id); setEditText(rule.response) }}
                    className="rounded-comic border-2 border-dashed px-3 py-2 min-h-12 cursor-pointer"
                    style={{ borderColor: rule.response ? '#4ADE80' : '#FBBF24' }}
                  >
                    {rule.response ? (
                      <p className="font-body text-white text-sm">
                        "{rule.response.replace('{agentName}', agentNameInput)}"
                      </p>
                    ) : (
                      <p className="font-body text-purple-light text-sm">
                        👆 Tap to write a response...
                      </p>
                    )}
                  </motion.div>
                )}
              </motion.div>
            ))}

            {/* ── Add rule button ── */}
            {!showTriggerPicker ? (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowTriggerPicker(true)}
                className="btn-purple w-full text-xl py-4"
              >
                + ADD RULE 🧩
              </motion.button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card-comic"
              >
                <p className="font-comic text-gold text-base mb-3">
                  👆 Pick a TRIGGER:
                </p>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {TRIGGER_BLOCKS.map(t => (
                    <motion.button
                      key={t.id}
                      whileTap={{ scale: 0.93 }}
                      onClick={() => startAddRule(t)}
                      className="rounded-comic border-2 border-black py-2 px-3 text-left flex items-center gap-2"
                      style={{ backgroundColor: t.color, boxShadow: '3px 3px 0 #111' }}
                    >
                      <span className="text-lg">{t.emoji}</span>
                      <span className="font-body font-800 text-white text-xs">{t.label}</span>
                    </motion.button>
                  ))}
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowTriggerPicker(false)}
                  className="btn-coral w-full text-base py-2"
                >
                  CANCEL
                </motion.button>
              </motion.div>
            )}

            {/* ── Test your agent ── */}
            {completedRules.length >= 1 && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTab('test')}
                className="btn-cyan w-full text-xl py-4"
              >
                TEST YOUR AGENT! 💬 →
              </motion.button>
            )}
          </>
        )}

        {/* ═══ TEST TAB ═══ */}
        {tab === 'test' && (
          <div className="flex flex-col h-full" style={{ minHeight: 'calc(100dvh - 220px)' }}>
            {/* Agent header */}
            <div className="card-comic flex items-center gap-3 mb-3">
              <ByteCharacter emotion="happy" size={56} />
              <div>
                <div className="font-comic text-cyan text-xl">{agentNameInput}</div>
                <div className="font-body text-green text-xs font-700 flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green animate-pulse" />
                  Online — {completedRules.length} rules active
                </div>
              </div>
            </div>

            {/* Chat area */}
            <div
              className="flex-1 overflow-y-auto flex flex-col gap-2 pb-3"
              style={{ maxHeight: '380px' }}
            >
              {chatMessages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className="max-w-xs rounded-2xl px-4 py-2 font-body font-700 text-sm"
                    style={{
                      backgroundColor: msg.from === 'user' ? '#6B21A8' : '#1C1338',
                      borderRadius: msg.from === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                      border: `2px solid ${msg.from === 'user' ? '#A855F7' : '#22D3EE'}`,
                    }}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Input bar */}
            <div className="flex gap-2 mt-2">
              <input
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Say something to your agent..."
                className="flex-1 bg-bg-panel border-2 border-purple-mid rounded-comic px-4 py-3
                           font-body font-800 text-white outline-none focus:border-cyan transition-colors text-sm"
              />
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={sendMessage}
                className="btn-cyan px-4 text-xl"
              >
                →
              </motion.button>
            </div>

            {/* Hint chips */}
            <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
              {completedRules.slice(0, 4).map(rule => (
                <motion.button
                  key={rule.id}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => { setInputText(rule.trigger); }}
                  className="flex-shrink-0 px-3 py-1 rounded-full border border-purple-mid
                             font-body text-purple-light text-xs font-700 bg-bg-panel"
                >
                  "{rule.trigger}"
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
