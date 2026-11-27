function rm(){
let[e,
t]=(0,
b.useState)(0),
[n,
r]=id[e];return(0,
V.jsxs)(Y.section,
{
className:`dental-light-section px-6 py-14 md:py-16`,
initial:{
opacity:0,
y:35
}
,
whileInView:{
opacity:1,
y:0
}
,
viewport:{
once:!0,
amount:.2
}
,
transition:{
duration:.8,
ease:`easeOut`
}
,
children:[(0,
V.jsx)(`div`,
{
className:`pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,
rgba(37,
99,
235,
.10),
transparent_32%),
radial-gradient(circle_at_88%_88%,
rgba(14,
165,
233,
.10),
transparent_36%)]`
}
),
(0,
V.jsxs)(`div`,
{
className:`relative z-10 mx-auto max-w-7xl`,
children:[(0,
V.jsxs)(`div`,
{
className:`mb-8 max-w-4xl`,
children:[(0,
V.jsx)(`p`,
{
className:`mb-3 text-sm font-black uppercase tracking-[0.38em] text-blue-600`,
children:`Por qué elegirnos`
}
),
(0,
V.jsx)(`h2`,
{
className:`font-display text-4xl font-black leading-[1.06] tracking-tight text-slate-950 md:text-6xl`,
children:`Una experiencia dental cómoda y confiable.`
}
),
(0,
V.jsx)(`p`,
{
className:`font-manrope mt-4 max-w-2xl text-base leading-8 text-slate-600 md:text-lg`,
children:`Mantenemos la atención personalizada,
 la tecnología moderna,
 los ambientes cómodos y el trato familiar como pilares de nuestra clínica.`
}
)]
}
),
(0,
V.jsxs)(`div`,
{
className:`grid items-stretch gap-7 lg:grid-cols-[0.95fr_1.05fr]`,
children:[(0,
V.jsxs)(Y.div,
{
className:`relative min-h-[390px] overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 shadow-2xl shadow-blue-950/10 md:min-h-[460px]`,
initial:{
opacity:0,
x:-30
}
,
whileInView:{
opacity:1,
x:0
}
,
viewport:{
once:!0,
amount:.25
}
,
transition:{
duration:.85,
ease:`easeOut`
}
,
children:[(0,
V.jsx)(Y.img,
{
src:rd[e],
alt:n,
className:`absolute inset-0 h-full w-full object-cover opacity-95`,
style:{
objectPosition:e===0?`center 35%`:e===1?`center 40%`:e===2?`center 48%`:`center 42%`
}
,
initial:{
scale:1.06,
opacity:0
}
,
animate:{
scale:1,
opacity:1
}
,
transition:{
duration:.45,
ease:`easeOut`
}

}
,
e),
(0,
V.jsx)(`div`,
{
className:`absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/28 to-transparent`
}
),
(0,
V.jsx)(`div`,
{
className:`absolute left-6 top-6 rounded-full border border-white/20 bg-white/15 px-5 py-2 text-xs font-black uppercase tracking-[0.22em] text-white backdrop-blur-xl`,
children:`Experiencia Cabanillas`
}
),
(0,
V.jsxs)(`div`,
{
className:`absolute bottom-7 left-7 right-7`,
children:[nm[e]&&(0,
V.jsx)(`p`,
{
className:`text-sm font-black uppercase tracking-[0.28em] text-blue-200`,
children:nm[e]
}
),
(0,
V.jsx)(`h3`,
{
className:`font-display mt-2 max-w-xl text-3xl font-black leading-tight text-white md:text-4xl`,
children:n
}
),
(0,
V.jsx)(`p`,
{
className:`font-manrope mt-3 max-w-xl text-base leading-7 text-white/82`,
children:r
}
)]
}
)]
}
),
(0,
V.jsx)(`div`,
{
className:`grid gap-5 sm:grid-cols-2`,
children:id.map(([n,
r],
i)=>{
let a=e===i;return(0,
V.jsxs)(Y.button,
{
type:`button`,
onClick:()=>t(i),
initial:{
opacity:0,
y:24
}
,
whileInView:{
opacity:1,
y:0
}
,
viewport:{
once:!0,
amount:.2
}
,
transition:{
duration:.75,
ease:`easeOut`,
delay:i*.07
}
,
className:`group relative min-h-[230px] overflow-hidden rounded-[1.5rem] border bg-white text-left shadow-lg shadow-blue-950/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-950/12 ${
a?`border-blue-500 ring-2 ring-blue-500/20`:`border-slate-200 hover:border-blue-400/60`
}
`,
children:[(0,
V.jsxs)(`div`,
{
className:`relative h-28 overflow-hidden bg-slate-100`,
children:[(0,
V.jsx)(`img`,
{
src:rd[i],
alt:n,
className:`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105`,
style:{
objectPosition:i===0?`center 35%`:i===1?`center 38%`:i===2?`center 48%`:`center 42%`
}

}
),
(0,
V.jsx)(`div`,
{
className:`absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent`
}
),
(0,
V.jsx)(`div`,
{
className:`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-2xl text-lg font-black transition-all duration-500 ${
a?`bg-blue-600 text-white`:`bg-white/90 text-blue-600 group-hover:bg-blue-600 group-hover:text-white`
}
`,
children:tm[i]
}
),
(0,
V.jsx)(`span`,
{
className:`absolute bottom-3 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-blue-700`,
children:String(i+1).padStart(2,
`0`)
}
)]
}
),
(0,
V.jsxs)(`div`,
{
className:`p-5`,
children:[(0,
V.jsx)(`h3`,
{
className:`text-xl font-black leading-tight text-slate-950 md:text-2xl`,
children:n
}
),
(0,
V.jsx)(`div`,
{
className:`my-3 h-[3px] rounded-full transition-all duration-500 ${
a?`w-24 bg-blue-500`:`w-14 bg-slate-200 group-hover:w-24 group-hover:bg-blue-500`
}
`
}
),
(0,
V.jsx)(`p`,
{
className:`font-manrope text-sm leading-6 text-slate-600`,
children:r
}
)]
}
)]
}
,
n)
}
)
}
)]
}
),
(0,
V.jsx)(`div`,
{
className:`mt-10 text-center`,
children:(0,
V.jsxs)(`button`,
{
type:`button`,
onClick:()=>{
window.dispatchEvent(new CustomEvent(`selectVideoCategory`,
{
detail:`eventos`
}
)),
document.getElementById(`multimedia`)?.scrollIntoView({
behavior:`smooth`,
block:`start`
}
)
}
,
className:`inline-flex items-center gap-3 rounded-full border border-blue-200 bg-white px-6 py-3 text-sm font-extrabold text-blue-700 shadow-xl shadow-blue-950/10 transition hover:-translate-y-0.5 hover:border-blue-400 hover:bg-blue-50`,
children:[`Ver videos de experiencias`,
(0,
V.jsx)(`span`,
{
children:`▶`
}
)]
}
)
}
)]
}
)]
}
)
}
var im=[`✦`,
`◇`,
`✧`,
`○`,
`◆`,
`✺`,
`◌`,
`▣`,
`✚`,
`⌁`];