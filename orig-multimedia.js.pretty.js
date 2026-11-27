function fm(){
let[e,
t]=(0,
b.useState)(null),
[n,
r]=(0,
b.useState)(`all`),
i=[{
id:`all`,
label:`Todos`
}
,
{
id:`tratamientos`,
label:`Tratamientos`
}
,
{
id:`ambientes`,
label:`Ambientes`
}
,
{
id:`tecnologia`,
label:`Tecnología`
}
,
{
id:`eventos`,
label:`Eventos`
}
];(0,
b.useEffect)(()=>{
let e=e=>{
let t=e.detail;i.map(e=>e.id).includes(t)&&r(t)
}
;return window.addEventListener(`selectVideoCategory`,
e),
()=>window.removeEventListener(`selectVideoCategory`,
e)
}
,
[]);let a=n===`all`?cd:cd.filter(e=>e.category===n);return(0,
V.jsxs)(V.Fragment,
{
children:[(0,
V.jsxs)(`section`,
{
id:`multimedia`,
className:`dental-dark-section px-6 py-20 text-white md:py-28`,
children:[(0,
V.jsx)(`div`,
{
className:`absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,
rgba(59,
130,
246,
.08),
transparent_60%)] pointer-events-none`
}
),
(0,
V.jsxs)(`div`,
{
className:`relative z-10 mx-auto max-w-7xl`,
children:[(0,
V.jsxs)(Y.div,
{
initial:{
opacity:0,
y:20
}
,
whileInView:{
opacity:1,
y:0
}
,
viewport:{
once:!0,
amount:.3
}
,
transition:{
duration:.7
}
,
className:`mb-10 text-center`,
children:[(0,
V.jsx)(`p`,
{
className:`mb-2 text-sm font-bold uppercase tracking-widest text-blue-200`,
children:`Contenido audiovisual`
}
),
(0,
V.jsx)(`h2`,
{
className:`font-playfair text-3xl font-bold leading-tight md:text-4xl lg:text-5xl`,
children:`Videos reales de nuestra experiencia clínica.`
}
),
(0,
V.jsx)(`p`,
{
className:`mt-4 max-w-2xl mx-auto text-slate-300`,
children:`Explora videos reales de tratamientos,
 tecnología,
 ambientes y momentos de Dental Cabanillas.`
}
)]
}
),
(0,
V.jsx)(Y.div,
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
transition:{
delay:.15
}
,
className:`mb-10 flex flex-wrap justify-center gap-3`,
children:i.map(e=>(0,
V.jsx)(`button`,
{
onClick:()=>r(e.id),
className:`rounded-full px-4 py-2 text-sm font-semibold transition transform ${
n===e.id?`bg-blue-600 text-white shadow-lg shadow-blue-500/30`:`bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10`
}
`,
children:e.label
}
,
e.id))
}
),
(0,
V.jsx)(`div`,
{
className:`relative`,
children:(0,
V.jsx)(Up,
{
modules:[Jp,
qp],
autoplay:{
delay:5e3,
disableOnInteraction:!1,
pauseOnMouseEnter:!0
}
,
pagination:{
clickable:!0
}
,
slidesPerView:1.15,
spaceBetween:16,
breakpoints:{
640:{
slidesPerView:1.4
}
,
768:{
slidesPerView:2.1
}
,
1024:{
slidesPerView:3
}

}
,
className:`py-4`,
children:a.length>0?a.map((e,
n)=>(0,
V.jsx)(Wp,
{
children:(0,
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
delay:n*.05
}
,
onClick:()=>t(e),
className:`group cursor-pointer h-full`,
children:[(0,
V.jsxs)(`div`,
{
className:`relative h-56 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-black shadow-lg transition-shadow hover:shadow-2xl`,
children:[(0,
V.jsx)(`img`,
{
src:e.thumbnail,
alt:e.title,
className:`h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110`,
style:{
objectPosition:`center 40%`
}

}
),
(0,
V.jsx)(`div`,
{
className:`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent`
}
),
(0,
V.jsx)(Y.div,
{
whileHover:{
scale:1.1
}
,
whileTap:{
scale:.95
}
,
className:`absolute inset-0 flex items-center justify-center`,
children:(0,
V.jsx)(`div`,
{
className:`rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 p-4 shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-shadow`,
children:(0,
V.jsx)(`svg`,
{
className:`h-8 w-8 text-white`,
fill:`currentColor`,
viewBox:`0 0 20 20`,
children:(0,
V.jsx)(`path`,
{
d:`M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z`
}
)
}
)
}
)
}
),
(0,
V.jsx)(`div`,
{
className:`absolute bottom-3 right-3 rounded-full bg-black/60 px-2 py-1 text-xs font-semibold text-white`,
children:e.duration
}
)]
}
),
(0,
V.jsxs)(`div`,
{
className:`mt-3`,
children:[(0,
V.jsx)(`h4`,
{
className:`font-bold text-white line-clamp-2 group-hover:text-blue-300 transition`,
children:e.title
}
),
(0,
V.jsx)(`p`,
{
className:`mt-1 text-xs text-slate-400`,
children:e.description
}
),
(0,
V.jsx)(`div`,
{
className:`mt-2 flex items-center gap-2`,
children:(0,
V.jsx)(`span`,
{
className:`text-xs font-semibold text-blue-300 capitalize`,
children:e.category
}
)
}
)]
}
)]
}
)
}
,
e.id)):(0,
V.jsx)(`div`,
{
className:`col-span-full py-12 text-center text-slate-400`,
children:`No hay videos en esta categoría`
}
)
}
)
}
),
(0,
V.jsxs)(Y.div,
{
initial:{
opacity:0,
y:16
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
delay:.25
}
,
className:`mt-12 text-center`,
children:[(0,
V.jsx)(`p`,
{
className:`text-slate-300 mb-4`,
children:`¿Quieres ver más contenido? También puedes seguirnos en redes sociales.`
}
),
(0,
V.jsxs)(`div`,
{
className:`flex flex-wrap justify-center gap-3`,
children:[(0,
V.jsx)(`a`,
{
href:`https://www.instagram.com/dental.cabanillas/`,
target:`_blank`,
rel:`noreferrer`,
className:`rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-5 py-2 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition`,
children:`Instagram`
}
),
(0,
V.jsx)(`a`,
{
href:`https://www.tiktok.com/@dental.cabanillas`,
target:`_blank`,
rel:`noreferrer`,
className:`rounded-full bg-black/60 border border-white/20 px-5 py-2 text-sm font-semibold text-white backdrop-blur-sm hover:bg-black/80 transition`,
children:`TikTok`
}
),
(0,
V.jsx)(`a`,
{
href:`https://www.facebook.com/Clinica.Cabanillas/`,
target:`_blank`,
rel:`noreferrer`,
className:`rounded-full bg-gradient-to-r from-blue-600 to-sky-600 px-5 py-2 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition`,
children:`Facebook`
}
)]
}
)]
}
)]
}
)]
}
),
(0,
V.jsx)(dm,
{
video:e,
isOpen:!!e,
onClose:()=>t(null)
}
)]
}
)
}
