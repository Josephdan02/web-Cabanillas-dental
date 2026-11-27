function hm(){
  let[
    e,
    t
  ]=(0,
  b.useState)(0),
  n=sd[
    e
  ],
  r=(n,
  r)=>{
    let i=e===r;
    return(0,
    V.jsxs)(`div`,
    {
      className:`overflow-hidden rounded-[
        1.75rem
      ] border border-white/12 bg-white/8 shadow-xl shadow-black/20 backdrop-blur-xl`,
      children:[
        (0,
        V.jsxs)(`button`,
        {
          type:`button`,
          onClick:()=>t(r),
          className:`flex w-full items-center gap-4 px-4 py-4 text-left`,
          "aria-expanded":i,
          children:[
            (0,
            V.jsx)(`span`,
            {
              className:`h-16 w-16 shrink-0 overflow-hidden rounded-2xl border-2 ${
                i?`border-blue-300 shadow-lg shadow-blue-500/20`:`border-white/15`
              }`,
              children:(0,
              V.jsx)(`img`,
              {
                src:n.image,
                alt:n.name,
                className:`h-full w-full object-cover`,
                style:{
                  objectPosition:`center 12%`
                }
              })
            }),
            (0,
            V.jsxs)(`span`,
            {
              className:`min-w-0 flex-1`,
              children:[
                (0,
                V.jsx)(`span`,
                {
                  className:`block text-lg font-black leading-tight text-white`,
                  children:n.name
                }),
                (0,
                V.jsx)(`span`,
                {
                  className:`mt-1 block text-sm font-bold text-blue-300`,
                  children:n.role
                }),
                n.cop&&(0,
                V.jsx)(`span`,
                {
                  className:`mt-1 block text-xs font-semibold text-slate-300`,
                  children:n.cop
                })
              ]
            }),
            (0,
            V.jsx)(`span`,
            {
              className:`grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 bg-white/10 text-xl font-black text-white`,
              children:i?`−`:`+`
            })
          ]
        }),
        (0,
        V.jsx)(Mc,
        {
          initial:!1,
          children:i&&(0,
          V.jsx)(Y.div,
          {
            initial:{
              height:0,
              opacity:0
            },
            animate:{
              height:`auto`,
              opacity:1
            },
            exit:{
              height:0,
              opacity:0
            },
            transition:{
              duration:.35
            },
            className:`overflow-hidden`,
            children:(0,
            V.jsxs)(`div`,
            {
              className:`px-4 pb-5`,
              children:[
                (0,
                V.jsxs)(`div`,
                {
                  className:`relative h-[
                    430px
                  ] overflow-hidden rounded-[
                    1.5rem
                  ] bg-slate-900 sm:h-[
                    520px
                  ]`,
                  children:[
                    (0,
                    V.jsx)(`img`,
                    {
                      src:n.image,
                      alt:n.name,
                      className:`h-full w-full object-cover`,
                      style:{
                        objectPosition:`center 9%`
                      }
                    }),
                    (0,
                    V.jsx)(`div`,
                    {
                      className:`absolute inset-0 bg-gradient-to-t from-slate-950/92 via-slate-950/20 to-transparent`
                    }),
                    (0,
                    V.jsx)(`div`,
                    {
                      className:`absolute bottom-0 left-0 right-0 p-4`,
                      children:(0,
                      V.jsxs)(`div`,
                      {
                        className:`rounded-2xl border border-white/15 bg-slate-950/65 p-4 backdrop-blur-xl`,
                        children:[
                          (0,
                          V.jsx)(`p`,
                          {
                            className:`text-sm font-extrabold text-blue-200`,
                            children:`+ pacientes atendidos con confianza`
                          }),
                          (0,
                          V.jsx)(`p`,
                          {
                            className:`mt-1 text-xs font-medium text-slate-300`,
                            children:`Atención personalizada · Experiencia clínica`
                          })
                        ]
                      })
                    })
                  ]
                }),
                (0,
                V.jsx)(`p`,
                {
                  className:`mt-5 text-base leading-8 text-slate-200`,
                  children:n.text
                }),
                (0,
                V.jsx)(`blockquote`,
                {
                  className:`mt-6 border-l-4 border-blue-300 pl-5 text-lg font-black italic leading-8 text-white`,
                  children:mm[
                    r
                  ]||`“Atención profesional con trato humano y enfoque personalizado.”`
                }),
                (0,
                V.jsxs)(`div`,
                {
                  className:`mt-6 grid gap-3 sm:grid-cols-3`,
                  children:[
                    (0,
                    V.jsx)(`a`,
                    {
                      href:Z.whatsapp,
                      target:`_blank`,
                      rel:`noreferrer`,
                      className:`rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-4 text-center text-sm font-extrabold text-white shadow-xl shadow-blue-600/25`,
                      children:`Agendar consulta`
                    }),
                    (0,
                    V.jsx)(`a`,
                    {
                      href:Z.facebook,
                      target:`_blank`,
                      rel:`noreferrer`,
                      className:`rounded-2xl border border-white/16 bg-white/8 px-5 py-4 text-center text-sm font-extrabold text-white backdrop-blur-xl`,
                      children:`Facebook`
                    }),
                    (0,
                    V.jsx)(`a`,
                    {
                      href:Z.instagram,
                      target:`_blank`,
                      rel:`noreferrer`,
                      className:`rounded-2xl border border-white/16 bg-white/8 px-5 py-4 text-center text-sm font-extrabold text-white backdrop-blur-xl`,
                      children:`Instagram`
                    })
                  ]
                })
              ]
            })
          })
        })
      ]
    },
    n.name)
  };
  return(0,
  V.jsxs)(`section`,
  {
    id:`equipo`,
    className:`dental-dark-section px-6 py-24 text-white md:py-32`,
    children:[
      (0,
      V.jsx)(`div`,
      {
        className:`absolute inset-0 bg-[
          radial-gradient(circle_at_20%_10%,
          rgba(37,
          99,
          235,
          .24),
          transparent_34%),
          radial-gradient(circle_at_80%_85%,
          rgba(14,
          165,
          233,
          .16),
          transparent_36%)
        ] pointer-events-none`
      }),
      (0,
      V.jsx)(`div`,
      {
        className:`absolute inset-0 bg-gradient-to-b from-slate-950/25 via-transparent to-slate-950/45 pointer-events-none`
      }),
      (0,
      V.jsxs)(`div`,
      {
        className:`relative z-10 mx-auto max-w-7xl`,
        children:[
          (0,
          V.jsxs)(`div`,
          {
            className:`mx-auto mb-16 max-w-3xl text-center`,
            children:[
              (0,
              V.jsx)(`p`,
              {
                className:`mb-4 inline-flex rounded-full border border-blue-300/35 bg-blue-400/10 px-5 py-2 text-xs font-extrabold uppercase tracking-[
                  0.22em
                ] text-blue-200`,
                children:`Conoce al equipo`
              }),
              (0,
              V.jsxs)(`h2`,
              {
                className:`text-4xl font-black leading-tight tracking-tight md:text-6xl`,
                children:[
                  `Profesionales dedicados a tu `,
                  (0,
                  V.jsx)(`span`,
                  {
                    className:`text-blue-300`,
                    children:`sonrisa y bienestar`
                  })
                ]
              }),
              (0,
              V.jsx)(`p`,
              {
                className:`mt-5 text-base leading-8 text-slate-300 md:text-lg`,
                children:`Un equipo preparado para acompañarte con trato cercano,
                 criterio clínico y una experiencia dental más humana.`
              })
            ]
          }),
          (0,
          V.jsx)(`div`,
          {
            className:`space-y-4 lg:hidden`,
            children:sd.map((e,
            t)=>r(e,
            t))
          }),
          (0,
          V.jsxs)(`div`,
          {
            className:`hidden gap-10 lg:grid lg:grid-cols-[
              0.95fr_1.05fr
            ] lg:items-center`,
            children:[
              (0,
              V.jsx)(Y.div,
              {
                initial:{
                  opacity:0,
                  x:-22
                },
                animate:{
                  opacity:1,
                  x:0
                },
                transition:{
                  duration:.55
                },
                className:`relative overflow-hidden rounded-[
                  2rem
                ] border border-white/12 bg-white/8 p-3 shadow-2xl shadow-black/35 backdrop-blur-xl`,
                children:(0,
                V.jsxs)(`div`,
                {
                  className:`relative h-[
                    520px
                  ] overflow-hidden rounded-[
                    1.6rem
                  ] bg-slate-900 md:h-[
                    600px
                  ]`,
                  children:[
                    (0,
                    V.jsx)(`img`,
                    {
                      src:n.image,
                      alt:n.name,
                      className:`h-full w-full object-cover`,
                      style:{
                        objectPosition:`center 9%`
                      }
                    }),
                    (0,
                    V.jsx)(`div`,
                    {
                      className:`absolute inset-0 bg-gradient-to-t from-slate-950/92 via-transparent to-transparent`
                    }),
                    (0,
                    V.jsx)(`div`,
                    {
                      className:`absolute bottom-0 left-0 right-0 p-6`,
                      children:(0,
                      V.jsxs)(`div`,
                      {
                        className:`rounded-3xl border border-white/15 bg-slate-950/60 p-5 backdrop-blur-xl`,
                        children:[
                          (0,
                          V.jsx)(`p`,
                          {
                            className:`text-sm font-extrabold text-blue-200`,
                            children:`+ pacientes atendidos con confianza`
                          }),
                          (0,
                          V.jsx)(`p`,
                          {
                            className:`mt-1 text-xs font-medium text-slate-300`,
                            children:`Atención personalizada · Experiencia clínica`
                          })
                        ]
                      })
                    })
                  ]
                })
              },
              n.name),
              (0,
              V.jsxs)(Y.div,
              {
                initial:{
                  opacity:0,
                  x:22
                },
                animate:{
                  opacity:1,
                  x:0
                },
                transition:{
                  duration:.55
                },
                className:`lg:pl-4`,
                children:[
                  (0,
                  V.jsxs)(`div`,
                  {
                    className:`mb-7 max-w-md rounded-3xl border border-white/14 bg-white/10 p-6 shadow-xl shadow-black/20 backdrop-blur-xl`,
                    children:[
                      (0,
                      V.jsx)(`h3`,
                      {
                        className:`text-2xl font-black text-white`,
                        children:n.name
                      }),
                      (0,
                      V.jsx)(`p`,
                      {
                        className:`mt-2 font-bold text-blue-300`,
                        children:n.role
                      }),
                      n.cop&&(0,
                      V.jsx)(`p`,
                      {
                        className:`mt-1 text-sm font-semibold text-slate-300`,
                        children:n.cop
                      })
                    ]
                  }),
                  (0,
                  V.jsx)(`p`,
                  {
                    className:`max-w-2xl text-base leading-8 text-slate-300 md:text-lg`,
                    children:n.text
                  }),
                  (0,
                  V.jsx)(`blockquote`,
                  {
                    className:`mt-8 border-l-4 border-blue-300 pl-6 text-xl font-black italic text-white`,
                    children:mm[
                      e
                    ]||`“Atención profesional con trato humano y enfoque personalizado.”`
                  }),
                  (0,
                  V.jsxs)(`div`,
                  {
                    className:`mt-8 flex flex-wrap gap-4`,
                    children:[
                      (0,
                      V.jsx)(`a`,
                      {
                        href:Z.whatsapp,
                        target:`_blank`,
                        rel:`noreferrer`,
                        className:`rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-4 text-sm font-extrabold text-white shadow-xl shadow-blue-600/25 transition-all duration-300 hover:-translate-y-1`,
                        children:`Agendar consulta`
                      }),
                      (0,
                      V.jsx)(`a`,
                      {
                        href:Z.facebook,
                        target:`_blank`,
                        rel:`noreferrer`,
                        className:`rounded-2xl border border-white/16 bg-white/8 px-6 py-4 text-sm font-extrabold text-white backdrop-blur-xl transition-all duration-300 hover:bg-white hover:text-slate-950`,
                        children:`Facebook`
                      }),
                      (0,
                      V.jsx)(`a`,
                      {
                        href:Z.instagram,
                        target:`_blank`,
                        rel:`noreferrer`,
                        className:`rounded-2xl border border-white/16 bg-white/8 px-6 py-4 text-sm font-extrabold text-white backdrop-blur-xl transition-all duration-300 hover:bg-white hover:text-slate-950`,
                        children:`Instagram`
                      })
                    ]
                  }),
                  (0,
                  V.jsx)(`div`,
                  {
                    className:`mt-10 flex flex-wrap gap-3`,
                    children:sd.map((n,
                    r)=>(0,
                    V.jsx)(`button`,
                    {
                      onClick:()=>t(r),
                      className:`h-14 w-14 overflow-hidden rounded-full border-2 transition-all duration-300 ${
                        e===r?`border-blue-300 scale-110 shadow-xl shadow-blue-500/25`:`border-white/20 opacity-70 hover:opacity-100`
                      }`,
                      "aria-label":`Ver ${
                        n.name
                      }`,
                      children:(0,
                      V.jsx)(`img`,
                      {
                        src:n.image,
                        alt:n.name,
                        className:`h-full w-full object-cover`,
                        style:{
                          objectPosition:`center 12%`
                        }
                      })
                    },
                    n.name))
                  })
                ]
              },
              `${
                n.name
              }-info`)
            ]
          })
        ]
      })
    ]
  })
}