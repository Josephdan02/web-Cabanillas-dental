function um(){
return(0,
V.jsxs)(`section`,
{
id:`tecnologia`,
className:`dental-dark-section px-5 py-24 text-white md:px-8 md:py-32`,
children:[(0,
V.jsx)(`div`,
{
className:`absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_10%,
rgba(56,
189,
248,
0.22),
transparent_30%),
radial-gradient(circle_at_82%_45%,
rgba(20,
184,
166,
0.18),
transparent_32%),
linear-gradient(135deg,
#061522_0%,
#0b2033_48%,
#07111d_100%)]`
}
),
(0,
V.jsx)(`div`,
{
className:`absolute left-1/2 top-0 -z-10 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent`
}
),
(0,
V.jsx)(`div`,
{
className:`absolute inset-x-0 bottom-0 -z-10 h-36 bg-gradient-to-t from-black/30 to-transparent`
}
),
(0,
V.jsxs)(`div`,
{
className:`mx-auto max-w-7xl`,
children:[(0,
V.jsxs)(`div`,
{
className:`mb-16 grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-end`,
children:[(0,
V.jsxs)(`div`,
{
children:[(0,
V.jsx)(Y.p,
{
initial:{
opacity:0,
y:12
}
,
whileInView:{
opacity:1,
y:0
}
,
viewport:{
once:!0
}
,
className:`mb-4 inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-cyan-200`,
children:`Tecnología dental`
}
),
(0,
V.jsx)(Y.h2,
{
initial:{
opacity:0,
y:18
}
,
whileInView:{
opacity:1,
y:0
}
,
viewport:{
once:!0
}
,
transition:{
delay:.08
}
,
className:`font-playfair text-4xl font-bold leading-tight md:text-6xl`,
children:`Tecnología avanzada para diagnósticos más precisos y tratamientos más seguros.`
}
)]
}
),
(0,
V.jsx)(Y.p,
{
initial:{
opacity:0,
y:18
}
,
whileInView:{
opacity:1,
y:0
}
,
viewport:{
once:!0
}
,
transition:{
delay:.16
}
,
className:`max-w-2xl text-lg leading-8 text-slate-300`,
children:`En Dental Cabanillas incorporamos herramientas digitales,
 inteligencia artificial y sistemas modernos de bioseguridad para ofrecer una atención más eficiente,
 cómoda y confiable.`
}
)]
}
),
(0,
V.jsx)(`div`,
{
className:`mb-12`,
children:(0,
V.jsxs)(`button`,
{
type:`button`,
onClick:()=>{
window.dispatchEvent(new CustomEvent(`selectVideoCategory`,
{
detail:`tecnologia`
}
)),
document.getElementById(`multimedia`)?.scrollIntoView({
behavior:`smooth`,
block:`start`
}
)
}
,
className:`inline-flex items-center gap-3 rounded-full border border-cyan-200/25 bg-cyan-300/10 px-6 py-3 text-sm font-extrabold text-cyan-100 shadow-xl shadow-cyan-950/20 backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-cyan-300/20`,
children:[`Ver videos de tecnología`,
(0,
V.jsx)(`span`,
{
children:`▶`
}
)]
}
)
}
),
(0,
V.jsx)(`div`,
{
className:`space-y-10 lg:space-y-14`,
children:om.map((e,
t)=>{
let n=t%2==1;return(0,
V.jsxs)(Y.div,
{
initial:`hidden`,
whileInView:`show`,
viewport:{
once:!0,
amount:.22
}
,
transition:{
staggerChildren:.12
}
,
className:`grid gap-6 lg:grid-cols-2 lg:items-center`,
children:[(0,
V.jsx)(cm,
{
item:e,
reverse:n
}
),
(0,
V.jsx)(lm,
{
item:e,
reverse:n
}
)]
}
,
e.title)
}
)
}
)]
}
)]
}
)
}
function dm({
video:e,
isOpen:t,
onClose:n
}
){
if((0,
b.useEffect)(()=>{
if(!t)return;let e=e=>{
e.key===`Escape`&&n()
}
;return document.body.style.overflow=`hidden`,
window.addEventListener(`keydown`,
e),
()=>{
document.body.style.overflow=``,
window.removeEventListener(`keydown`,
e)
}

}
,
[t,
n]),
!t||!e)return null;let r=e.platform===`local`||e.videoUrl?.endsWith(`.mp4`);return(0,
V.jsx)(Mc,
{
children:t&&(0,
V.jsxs)(Y.div,
{
initial:{
opacity:0
}
,
animate:{
opacity:1
}
,
exit:{
opacity:0
}
,
transition:{
duration:.22
}
,
onClick:n,
className:`fixed inset-0 z-[999] flex min-h-[100dvh] items-start justify-center overflow-y-auto bg-black/86 px-3 py-4 pb-28 backdrop-blur-md md:items-center md:px-6 md:py-8`,
children:[(0,
V.jsxs)(Y.div,
{
initial:{
opacity:0,
scale:.94,
y:18
}
,
animate:{
opacity:1,
scale:1,
y:0
}
,
exit:{
opacity:0,
scale:.94,
y:18
}
,
transition:{
duration:.32,
ease:`easeOut`
}
,
onClick:e=>e.stopPropagation(),
className:`relative w-full max-w-5xl`,
children:[(0,
V.jsxs)(Y.button,
{
whileHover:{
scale:1.05
}
,
whileTap:{
scale:.96
}
,
onClick:n,
"aria-label":`Cerrar video`,
className:`fixed right-4 top-4 z-[1002] inline-flex items-center gap-2 rounded-full border border-white/20 bg-white px-4 py-3 text-sm font-extrabold text-slate-950 shadow-2xl shadow-black/40 backdrop-blur-xl transition hover:bg-slate-950 hover:text-white md:absolute md:-right-2 md:-top-14 md:bg-slate-950/90 md:text-white md:hover:bg-white md:hover:text-slate-950`,
children:[(0,
V.jsx)(`svg`,
{
className:`h-5 w-5`,
fill:`none`,
stroke:`currentColor`,
viewBox:`0 0 24 24`,
children:(0,
V.jsx)(`path`,
{
strokeLinecap:`round`,
strokeLinejoin:`round`,
strokeWidth:2.4,
d:`M6 18L18 6M6 6l12 12`
}
)
}
),
(0,
V.jsx)(`span`,
{
className:`hidden sm:inline`,
children:`Cerrar`
}
)]
}
),
(0,
V.jsx)(`div`,
{
className:`relative flex max-h-[52dvh] w-full items-center justify-center overflow-hidden rounded-3xl bg-black shadow-2xl ring-1 ring-white/10 sm:max-h-[60dvh] md:max-h-[74vh]`,
children:r?(0,
V.jsx)(`video`,
{
src:e.videoUrl,
poster:e.thumbnail,
controls:!0,
autoPlay:!0,
preload:`metadata`,
playsInline:!0,
className:`max-h-[52dvh] w-full bg-black object-contain sm:max-h-[60dvh] md:max-h-[74vh]`,
children:`Tu navegador no puede reproducir este video.`
}
,
e.videoUrl):(0,
V.jsx)(`iframe`,
{
src:e.videoUrl,
title:e.title,
allow:`accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture`,
allowFullScreen:!0,
className:`aspect-video h-full w-full`
}
)
}
),
(0,
V.jsxs)(Y.div,
{
initial:{
opacity:0,
y:12
}
,
animate:{
opacity:1,
y:0
}
,
transition:{
delay:.15
}
,
className:`mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md md:mt-5 md:p-5`,
children:[(0,
V.jsx)(`h3`,
{
className:`text-lg font-bold text-white md:text-xl`,
children:e.title
}
),
(0,
V.jsx)(`p`,
{
className:`mt-2 text-sm leading-relaxed text-slate-300 md:text-base`,
children:e.description
}
),
(0,
V.jsxs)(`div`,
{
className:`mt-4 flex flex-wrap items-center gap-2 md:gap-3`,
children:[(0,
V.jsx)(`span`,
{
className:`inline-block rounded-full bg-blue-500/20 px-3 py-1 text-sm text-blue-300`,
children:e.duration
}
),
(0,
V.jsx)(`span`,
{
className:`rounded-full bg-white/10 px-3 py-1 text-sm capitalize text-slate-300`,
children:e.category
}
),
r&&(0,
V.jsx)(`span`,
{
className:`rounded-full bg-emerald-500/15 px-3 py-1 text-sm text-emerald-200`,
children:`Video local MP4`
}
)]
}
)]
}
)]
}
),
(0,
V.jsxs)(Y.button,
{
initial:{
opacity:0,
y:18
}
,
animate:{
opacity:1,
y:0
}
,
exit:{
opacity:0,
y:18
}
,
transition:{
duration:.25
}
,
onClick:e=>{
e.stopPropagation(),
n()
}
,
"aria-label":`Cerrar video`,
className:`fixed bottom-4 left-4 right-4 z-[1001] flex items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white px-5 py-4 text-base font-extrabold text-slate-950 shadow-2xl shadow-black/50 md:hidden`,
children:[(0,
V.jsx)(`svg`,
{
className:`h-5 w-5`,
fill:`none`,
stroke:`currentColor`,
viewBox:`0 0 24 24`,
children:(0,
V.jsx)(`path`,
{
strokeLinecap:`round`,
strokeLinejoin:`round`,
strokeWidth:2.4,
d:`M6 18L18 6M6 6l12 12`
}
)
}
),
`Cerrar video`]
}
)]
}
)
}
)
}
