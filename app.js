:root {
  --bg: #f4f7fb;
  --card: #ffffff;
  --primary: #4f46e5;
  --primary-dark: #3f37c9;
  --text: #1f2937;
  --muted: #6b7280;
  --border: #e5e7eb;
  --success: #10b981;
  --danger: #ef4444;
  --shadow: 0 20px 45px rgba(79, 70, 229, 0.12);
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  font-family: Arial, Helvetica, sans-serif;
  background: linear-gradient(135deg, #eef2ff 0%, #f8fafc 100%);
  color: var(--text);
}

button,
input {
  font: inherit;
}

.app {
  width: min(100%, 620px);
  padding: 32px 20px;
}

.header {
  margin-bottom: 20px;
}

.eyebrow {
  margin: 0 0 8px;
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--primary);
  font-weight: 700;
}

h1 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 3rem);
}

.card {
  background: var(--card);
  border-radius: 22px;
  box-shadow: var(--shadow);
  padding: 24px;
}

.task-form {
  display: flex;
  gap: 12px;
  margin-bottom: 18px;
}

.task-form input {
  flex: 1;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 14px 16px;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.task-form input:focus {
  border-color: rgba(79, 70, 229, 0.5);
  box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.12);
}

.task-form button,
.secondary-btn,
.filter-btn,
.task-item button {
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.task-form button {
  background: var(--primary);
  color: white;
  border-radius: 12px;
  padding: 14px 20px;
  font-weight: 700;
}

.task-form button:hover,
.secondary-btn:hover,
.filter-btn:hover,
.task-item button:hover {
  transform: translateY(-1px);
}

.toolbar {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-btn,
.secondary-btn {
  border-radius: 10px;
  padding: 8px 12px;
  background: #eef2ff;
  color: var(--text);
  font-weight: 600;
}

.filter-btn.active {
  background: var(--primary);
  color: white;
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.task-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 12px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: #fafbff;
}

.task-item input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: var(--success);
}

.task-text {
  flex: 1;
  word-break: break-word;
}

.task-item.completed .task-text {
  text-decoration: line-through;
  color: var(--muted);
}

.delete-btn {
  background: rgba(239, 68, 68, 0.1);
  color: var(--danger);
  border-radius: 8px;
  padding: 8px 10px;
  font-size: 0.9rem;
  font-weight: 700;
}

.summary {
  margin-top: 18px;
  color: var(--muted);
  font-size: 0.95rem;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 560px) {
  .task-form,
  .toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .task-form button,
  .secondary-btn,
  .filter-btn {
    width: 100%;
  }
}
