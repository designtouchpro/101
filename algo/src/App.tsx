import { useState } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
// Stack & Queue
import StackBasics from './pages/stack/StackBasics'
import StackProblems from './pages/stack/StackProblems'
import QueueBasics from './pages/queue/QueueBasics'
// Trees
import BinaryTree from './pages/tree/BinaryTree'
import TreeTraversal from './pages/tree/TreeTraversal'
import BSTDemo from './pages/tree/BSTDemo'
// Sorting
import BasicSorts from './pages/sort/BasicSorts'
import AdvancedSorts from './pages/sort/AdvancedSorts'
import SortComparison from './pages/sort/SortComparison'
// Linked Lists
import SinglyLinkedList from './pages/list/SinglyLinkedList'
import ListProblems from './pages/list/ListProblems'
// Hash Tables
import HashBasics from './pages/hash/HashBasics'
import HashProblems from './pages/hash/HashProblems'
// Graph & Search
import GraphBasics from './pages/graph/GraphBasics'
import GraphsHeap from './pages/graph/GraphsHeap'
import BinarySearch from './pages/search/BinarySearch'
// Recursion
import RecursionBacktracking from './pages/recursion/RecursionBacktracking'
// Dynamic Programming
import DynamicProgramming from './pages/dp/DynamicProgramming'
// Interview
import InterviewQuestions from './pages/InterviewQuestions'
import ProblemTaxonomy from './pages/taxonomy/ProblemTaxonomy'
import ThemeToggle from './components/ThemeToggle'

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => localStorage.getItem('algo-sidebar-collapsed') === 'true')

  const handleNavClick = () => {
    setMobileMenuOpen(false)
  }

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => {
      localStorage.setItem('algo-sidebar-collapsed', String(!prev))
      return !prev
    })
  }

  return (
    <>
      <ScrollToTop />
      
      {/* Mobile Header */}
      <header className="mobile-header">
        <button 
          className="hamburger-btn" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
        <h1><img src="/logo.svg" alt="" width="28" height="28" style={{ marginRight: '8px' }} /> Algo 101</h1>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)} />
      )}

      <div className={`app-layout ${sidebarCollapsed ? 'layout-collapsed' : ''}`}>
        <aside className={`sidebar ${mobileMenuOpen ? 'sidebar-open' : ''} ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          <div className="sidebar-header">
            <div className="sidebar-header-top">
              <h1><img src="/logo.svg" alt="" width="28" height="28" style={{ marginRight: '8px' }} /> Algo 101</h1>
              <ThemeToggle />
            </div>
            <p>Алгоритмы и структуры данных</p>
            <a href={import.meta.env.VITE_DEPLOY_TARGET === 'github-pages' ? new URL('..', window.location.origin + import.meta.env.BASE_URL).toString() : 'http://localhost:3200'} className="back-to-index">← Все плейграунды</a>
          </div>

          <nav className="nav-section">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end onClick={handleNavClick}>
              <span className="nav-link-icon">🏠</span>
              Главная
            </NavLink>

            <div className="nav-section-title">Стек и Очередь</div>
            
            <NavLink to="/stack/basics" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">📚</span>
              Основы стека
            </NavLink>
            
            <NavLink to="/stack/problems" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🧩</span>
              Задачи на стек
            </NavLink>
            
            <NavLink to="/queue/basics" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🚶</span>
              Очередь и Deque
            </NavLink>

            <div className="nav-section-title">Деревья</div>
            
            <NavLink to="/tree/binary" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🌳</span>
              Бинарное дерево
            </NavLink>
            
            <NavLink to="/tree/traversal" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🔄</span>
              Обход деревьев
            </NavLink>
            
            <NavLink to="/tree/bst" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🔎</span>
              BST
            </NavLink>

            <div className="nav-section-title">Сортировки</div>
            
            <NavLink to="/sort/basic" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">📊</span>
              Базовые O(n²)
            </NavLink>
            
            <NavLink to="/sort/advanced" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">⚡</span>
              Продвинутые O(n log n)
            </NavLink>
            
            <NavLink to="/sort/comparison" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">📋</span>
              Сравнение
            </NavLink>

            <div className="nav-section-title">Связные списки</div>
            
            <NavLink to="/list/singly" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🔗</span>
              Связный список
            </NavLink>
            
            <NavLink to="/list/problems" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🧩</span>
              Задачи на списки
            </NavLink>

            <div className="nav-section-title">Хеш-таблицы</div>
            
            <NavLink to="/hash/basics" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">#️⃣</span>
              Основы хешей
            </NavLink>
            
            <NavLink to="/hash/problems" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🧩</span>
              Задачи на хеши
            </NavLink>

            <div className="nav-section-title">Графы и Поиск</div>
            
            <NavLink to="/graph/basics" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🕸️</span>
              Графы
            </NavLink>
            
            <NavLink to="/graph/heap" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🏔️</span>
              Графы и Heap
            </NavLink>
            
            <NavLink to="/search/binary" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🔍</span>
              Бинарный поиск
            </NavLink>

            <div className="nav-section-title">Рекурсия</div>

            <NavLink to="/recursion/backtracking" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🔄</span>
              Рекурсия и бэктрекинг
            </NavLink>

            <div className="nav-section-title">Динамическое программирование</div>

            <NavLink to="/dp/basics" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🧩</span>
              Основы DP
            </NavLink>

            <div className="nav-section-title">Таксономия</div>

            <NavLink to="/taxonomy" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🗺️</span>
              Паттерны задач
            </NavLink>

            <div className="nav-section-title">Собеседование</div>
            
            <NavLink to="/interview" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🎯</span>
              Вопросы
            </NavLink>

            <button className="sidebar-collapse-btn" onClick={toggleSidebar}>
              {sidebarCollapsed ? '»' : '«'}
              <span className="collapse-text">{sidebarCollapsed ? 'Развернуть' : 'Свернуть'}</span>
            </button>
          </nav>
        </aside>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Stack & Queue */}
            <Route path="/stack/basics" element={<StackBasics />} />
            <Route path="/stack/problems" element={<StackProblems />} />
            <Route path="/queue/basics" element={<QueueBasics />} />
            {/* Trees */}
            <Route path="/tree/binary" element={<BinaryTree />} />
            <Route path="/tree/traversal" element={<TreeTraversal />} />
            <Route path="/tree/bst" element={<BSTDemo />} />
            {/* Sorting */}
            <Route path="/sort/basic" element={<BasicSorts />} />
            <Route path="/sort/advanced" element={<AdvancedSorts />} />
            <Route path="/sort/comparison" element={<SortComparison />} />
            {/* Linked Lists */}
            <Route path="/list/singly" element={<SinglyLinkedList />} />
            <Route path="/list/problems" element={<ListProblems />} />
            {/* Hash Tables */}
            <Route path="/hash/basics" element={<HashBasics />} />
            <Route path="/hash/problems" element={<HashProblems />} />
            {/* Graph & Search */}
            <Route path="/graph/basics" element={<GraphBasics />} />
            <Route path="/graph/heap" element={<GraphsHeap />} />
            <Route path="/search/binary" element={<BinarySearch />} />
            {/* Recursion */}
            <Route path="/recursion/backtracking" element={<RecursionBacktracking />} />
            {/* DP */}
            <Route path="/dp/basics" element={<DynamicProgramming />} />
            <Route path="/taxonomy" element={<ProblemTaxonomy />} />
            {/* Interview */}
            <Route path="/interview" element={<InterviewQuestions />} />
          </Routes>
        </main>
      </div>
    </>
  )
}
