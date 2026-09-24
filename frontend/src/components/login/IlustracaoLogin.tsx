/**
 * Ilustração da tela de login do INSPESIM: fiscal e veterinária, pilha de caixas
 * com selo de inspeção, prancheta de fiscalização, laudo e animais de produção.
 * Mesma concepção da tela do AulaSim, em tons claros da paleta da logo
 * (verde #11A352, amarelo #FABA15 e grafite).
 */

const C = {
  verde: '#11A352',
  verdeEsc: '#0C7F3F',
  verdeMedio: '#6DC894',
  verdeClaro: '#A7DEC0',
  verdeBg: '#EAF5EF',
  amarelo: '#FABA15',
  amareloClaro: '#FDD46A',
  amareloBg: '#FEF4DA',
  grafite: '#17241D',
  grafiteClaro: '#3B5A4A',
  contorno: '#DCE8E1',
  neutro: '#E7EFEA',
  papel: '#FFFFFF',
  pele: '#F2C29E',
  peleSombra: '#E5AE88',
  pele2: '#C98E6B',
  pele2Sombra: '#B97A55',
  cabelo: '#8A6A3B',
  focinho: '#F7E3D5',
};

function Brilho({ x, y, r, cor }: { x: number; y: number; r: number; cor: string }) {
  const k = r * 0.18;
  return (
    <path
      transform={`translate(${x} ${y})`}
      d={`M0 ${-r} C ${k} ${-k} ${k} ${-k} ${r} 0 C ${k} ${k} ${k} ${k} 0 ${r} C ${-k} ${k} ${-k} ${k} ${-r} 0 C ${-k} ${-k} ${-k} ${-k} 0 ${-r} Z`}
      fill={cor}
    />
  );
}

/** Caixa de transporte de produtos, empilhada */
function Caixa({
  x,
  y,
  w,
  h,
  cor,
  lateral,
  interior,
  inicioInterior,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  cor: string;
  lateral: string;
  interior: string;
  inicioInterior: number;
}) {
  const iy = y + 7;
  const ih = h - 14;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill={cor} />
      <rect x={x + 14} y={y} width={10} height={h} fill={lateral} />
      <rect x={x + inicioInterior} y={iy} width={w - inicioInterior - 6} height={ih} rx={ih / 2} fill={interior} />
      {/* ripas da caixa sobre o conteúdo */}
      {[1, 2, 3].map((k) => {
        const rx = x + inicioInterior + ((w - inicioInterior - 6) * k) / 4;
        return <rect key={k} x={rx - 3} y={iy} width={6} height={ih} rx={3} fill={cor} opacity={0.45} />;
      })}
      <line
        x1={x + inicioInterior + 16}
        y1={iy + ih * 0.36}
        x2={x + w - 18}
        y2={iy + ih * 0.36}
        stroke={C.contorno}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <line
        x1={x + inicioInterior + 16}
        y1={iy + ih * 0.68}
        x2={x + w - 18}
        y2={iy + ih * 0.68}
        stroke={C.contorno}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </g>
  );
}

export function IlustracaoLogin({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 540 420" className={className} role="presentation" aria-hidden>
      {/* sombra do chão */}
      <rect x={52} y={386} width={456} height={6} rx={3} fill={C.contorno} />

      {/* folhagem atrás da pilha */}
      <path d="M262 200 C 236 170 232 130 250 96 C 272 128 278 168 262 200Z" fill={C.verdeMedio} />
      <path d="M270 200 C 268 158 286 122 322 106 C 322 146 302 182 270 200Z" fill={C.verde} />
      <path d="M258 202 C 238 186 214 178 190 184 C 206 206 234 212 258 202Z" fill={C.verdeEsc} />
      <path
        d="M256 190 C 252 160 252 130 250 104 M272 194 C 284 160 298 132 316 114"
        stroke="#BFE6CF"
        strokeWidth={1.5}
        fill="none"
        strokeLinecap="round"
      />

      {/* laudo de inspeção com selo */}
      <g transform="rotate(-14 236 126)">
        <rect x={200} y={78} width={72} height={96} rx={6} fill={C.papel} stroke={C.contorno} strokeWidth={2} />
        {[96, 108, 120, 132].map((ly) => (
          <line key={ly} x1={212} y1={ly} x2={258} y2={ly} stroke="#CFDDD5" strokeWidth={3} strokeLinecap="round" />
        ))}
        <circle cx={248} cy={152} r={13} fill={C.verdeBg} stroke={C.verde} strokeWidth={2} />
        <path d="M242 152 L 246 157 L 254 147" stroke={C.verde} strokeWidth={2.6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* prancheta de fiscalização */}
      <g transform="rotate(-24 155 250)">
        <rect x={80} y={120} width={150} height={236} rx={12} fill={C.verde} />
        <rect x={80} y={120} width={24} height={236} rx={11} fill={C.verdeEsc} />
        <rect x={94} y={142} width={122} height={200} rx={8} fill={C.papel} />
        <rect x={128} y={110} width={54} height={24} rx={7} fill={C.verdeEsc} />
        <rect x={140} y={104} width={30} height={12} rx={6} fill={C.grafiteClaro} />
        {[
          { y: 168, marcado: true },
          { y: 200, marcado: true },
          { y: 232, marcado: false },
          { y: 264, marcado: true },
          { y: 296, marcado: false },
        ].map((linha) => (
          <g key={linha.y}>
            <rect x={108} y={linha.y} width={18} height={18} rx={5} fill={linha.marcado ? C.verdeBg : C.neutro} />
            {linha.marcado && (
              <path
                d={`M112 ${linha.y + 9} L 116 ${linha.y + 13} L 122 ${linha.y + 5}`}
                stroke={C.verde}
                strokeWidth={2.4}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
            <rect x={134} y={linha.y + 5} width={66} height={7} rx={3.5} fill={C.neutro} />
          </g>
        ))}
        <rect x={108} y={322} width={44} height={10} rx={5} fill={C.amareloClaro} />
      </g>

      {/* pilha de caixas (de baixo para cima) */}
      <Caixa x={150} y={338} w={350} h={48} cor={C.verde} lateral={C.verdeEsc} interior="#EDF7F1" inicioInterior={46} />
      <Caixa x={185} y={282} w={255} h={56} cor={C.grafite} lateral={C.grafiteClaro} interior="#E4EDE8" inicioInterior={50} />
      <Caixa x={160} y={232} w={260} h={50} cor={C.amarelo} lateral="#E0A40F" interior="#FEF6E3" inicioInterior={46} />
      <Caixa x={205} y={190} w={240} h={42} cor={C.verdeMedio} lateral={C.verde} interior="#F1FAF5" inicioInterior={45} />

      {/* selo de inspeção na caixa da base */}
      <g>
        <circle cx={330} cy={362} r={16} fill={C.papel} stroke={C.verde} strokeWidth={2.5} />
        <circle cx={330} cy={362} r={11} fill={C.verdeBg} />
        <path d="M324 362 L 328 367 L 337 356" stroke={C.verde} strokeWidth={2.8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* veterinária sentada no topo da pilha */}
      <g>
        <rect x={402} y={182} width={15} height={58} rx={7.5} fill="#4A6B59" />
        <ellipse cx={413} cy={243} rx={11} ry={5.5} fill={C.grafite} />
        <path d="M352 110 C 346 80 366 66 384 70 C 404 74 410 96 402 118 C 400 132 394 140 386 142 L 356 140 C 350 132 350 120 352 110Z" fill={C.cabelo} />
        <rect x={371} y={116} width={10} height={12} fill={C.peleSombra} />
        {/* jaleco */}
        <path d="M352 134 C 352 124 360 120 376 120 C 392 120 400 126 400 138 L 402 190 L 350 190 Z" fill={C.papel} stroke={C.contorno} strokeWidth={1.5} />
        <path d="M366 122 C 369 134 376 143 376 143 C 376 143 383 134 386 122 Z" fill={C.verde} />
        {/* estetoscópio */}
        <path d="M366 124 C 361 140 367 153 376 155 C 385 153 391 140 386 124" stroke={C.verde} strokeWidth={2.6} fill="none" strokeLinecap="round" />
        <circle cx={376} cy={159} r={4.5} fill={C.verde} />
        <rect x={358} y={174} width={78} height={18} rx={9} fill={C.grafiteClaro} />
        <rect x={420} y={180} width={16} height={62} rx={8} fill={C.grafiteClaro} />
        <ellipse cx={431} cy={245} rx={12} ry={6} fill={C.grafite} />
        <circle cx={376} cy={100} r={16} fill={C.pele} />
        <path d="M359 97 C 360 80 377 73 392 82 C 387 91 376 95 359 97Z" fill={C.cabelo} />
        <circle cx={371} cy={103} r={1.7} fill={C.grafite} />
        <circle cx={382} cy={103} r={1.7} fill={C.grafite} />
        <path d="M372 110 Q 376.5 113 381 110" stroke={C.grafite} strokeWidth={1.4} fill="none" strokeLinecap="round" />
        {/* tablet */}
        <path d="M384 150 L 438 142 L 433 177 L 379 183 Z" fill={C.grafite} />
        <path d="M372 183 L 432 177 L 442 181 L 380 188 Z" fill={C.grafiteClaro} />
        <circle cx={409} cy={163} r={3} fill={C.verdeMedio} />
        <path d="M391 134 C 397 154 404 168 414 178" stroke={C.pele} strokeWidth={8} fill="none" strokeLinecap="round" />
        <path d="M390 130 L 395 146" stroke={C.papel} strokeWidth={12} strokeLinecap="round" />
      </g>

      {/* fiscal sentado na base da pilha */}
      <g>
        <rect x={166} y={336} width={15} height={46} rx={7.5} fill="#2F4A3C" />
        <ellipse cx={173} cy={384} rx={11} ry={5} fill={C.grafite} />
        <path d="M190 288 C 190 273 200 266 214 266 C 230 266 238 274 238 290 L 240 342 L 188 342 Z" fill={C.verde} />
        <rect x={188} y={298} width={52} height={9} fill={C.amarelo} />
        <rect x={150} y={328} width={72} height={18} rx={9} fill={C.grafiteClaro} />
        <rect x={146} y={334} width={16} height={48} rx={8} fill={C.grafiteClaro} />
        <ellipse cx={151} cy={385} rx={12} ry={5.5} fill={C.grafite} />
        <rect x={208} y={254} width={10} height={14} fill={C.pele2Sombra} />
        <circle cx={213} cy={242} r={16} fill={C.pele2} />
        {/* boné */}
        <path d="M196 240 C 195 222 208 213 222 216 C 233 219 235 231 233 240 Z" fill={C.verde} />
        <path d="M229 238 C 242 236 249 240 249 245 L 227 247 Z" fill={C.verdeEsc} />
        <circle cx={208} cy={247} r={1.7} fill={C.grafite} />
        <circle cx={219} cy={247} r={1.7} fill={C.grafite} />
        <path d="M209 254 Q 213.5 257 218 254" stroke={C.grafite} strokeWidth={1.4} fill="none" strokeLinecap="round" />
        {/* prancheta no colo */}
        <g transform="rotate(-10 160 314)">
          <rect x={128} y={292} width={64} height={48} rx={6} fill={C.papel} stroke={C.contorno} strokeWidth={2} />
          <rect x={146} y={286} width={28} height={11} rx={4} fill={C.verde} />
          <path d="M136 312 L 140 316 L 147 307" stroke={C.verde} strokeWidth={2.4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <rect x={152} y={308} width={32} height={6} rx={3} fill={C.neutro} />
          <rect x={136} y={324} width={48} height={6} rx={3} fill={C.neutro} />
        </g>
        <path d="M204 284 C 196 300 188 312 178 324" stroke={C.pele2} strokeWidth={8} fill="none" strokeLinecap="round" />
        <path d="M205 280 L 200 294" stroke={C.verde} strokeWidth={12} strokeLinecap="round" />
      </g>

      {/* vaca */}
      <g>
        <rect x={392} y={348} width={12} height={38} rx={6} fill={C.neutro} />
        <rect x={414} y={352} width={12} height={34} rx={6} fill={C.contorno} />
        <rect x={462} y={348} width={12} height={38} rx={6} fill={C.neutro} />
        <rect x={482} y={352} width={12} height={34} rx={6} fill={C.contorno} />
        <path d="M500 306 C 517 313 519 335 508 347" stroke={C.contorno} strokeWidth={4} fill="none" strokeLinecap="round" />
        <ellipse cx={442} cy={386} rx={62} ry={5} fill={C.contorno} />
        <rect x={380} y={296} width={122} height={66} rx={33} fill="#FBFDFC" stroke="#C3D6CB" strokeWidth={2.5} />
        <ellipse cx={412} cy={318} rx={15} ry={11} fill={C.contorno} />
        <ellipse cx={462} cy={336} rx={19} ry={12} fill={C.contorno} />
        <path d="M348 296 C 339 291 335 298 342 305 Z" fill={C.contorno} />
        <path d="M392 293 C 403 289 407 296 398 302 Z" fill={C.contorno} />
        <ellipse cx={372} cy={308} rx={28} ry={24} fill="#FBFDFC" stroke="#C3D6CB" strokeWidth={2.5} />
        <ellipse cx={362} cy={320} rx={17} ry={12} fill={C.focinho} />
        <circle cx={356} cy={319} r={2.2} fill="#D6BCAB" />
        <circle cx={366} cy={321} r={2.2} fill="#D6BCAB" />
        <circle cx={370} cy={298} r={2.4} fill={C.grafite} />
        <rect x={386} y={300} width={12} height={10} rx={3} fill={C.amarelo} />
      </g>

      {/* galinha */}
      <g>
        <path d="M266 386 L 266 392 M278 386 L 278 392" stroke={C.amarelo} strokeWidth={3} strokeLinecap="round" />
        <ellipse cx={272} cy={368} rx={22} ry={17} fill={C.papel} stroke={C.contorno} strokeWidth={2} />
        <path d="M262 360 C 271 356 283 359 287 367 C 280 373 267 372 262 360Z" fill="#EFF5F1" />
        <circle cx={255} cy={348} r={11} fill={C.papel} stroke={C.contorno} strokeWidth={2} />
        <path d="M249 338 C 251 331 257 331 257 337 C 261 333 266 337 262 342 L 249 342 Z" fill={C.amarelo} />
        <path d="M245 348 L 236 351 L 245 354 Z" fill={C.amarelo} />
        <circle cx={252} cy={345} r={1.8} fill={C.grafite} />
      </g>

      {/* folhagem à frente */}
      <path d="M120 386 C 80 380 46 356 38 320 C 76 324 106 348 120 386Z" fill={C.verdeClaro} />
      <path d="M124 386 C 102 350 102 316 124 292 C 142 322 142 358 124 386Z" fill={C.verdeMedio} />
      <path d="M128 386 C 138 354 160 334 188 330 C 180 360 158 380 128 386Z" fill={C.verde} opacity={0.85} />
      <path
        d="M116 380 C 96 362 72 344 50 330 M124 380 C 122 350 122 322 124 302 M132 380 C 146 360 162 346 180 338"
        stroke="#E6F6EC"
        strokeWidth={1.5}
        fill="none"
        strokeLinecap="round"
      />

      {/* brilhos */}
      <Brilho x={135} y={30} r={9} cor={C.amarelo} />
      <Brilho x={307} y={25} r={9} cor={C.verdeMedio} />
      <Brilho x={222} y={78} r={6} cor={C.verde} />
      <Brilho x={100} y={106} r={5} cor={C.amarelo} />
      <Brilho x={20} y={170} r={8} cor={C.verdeMedio} />
      <Brilho x={450} y={88} r={5} cor={C.amarelo} />
      <Brilho x={508} y={158} r={8} cor={C.verdeClaro} />
      <Brilho x={483} y={226} r={7} cor={C.amarelo} />
    </svg>
  );
}
