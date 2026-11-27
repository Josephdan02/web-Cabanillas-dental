function am(){
  let[
    e,
    t
  ]=(0,
  b.useState)(0),
  n=ad[
    e
  ],
  r=()=>{
    window.dispatchEvent(new CustomEvent(`selectVideoCategory`,
    {
      detail:`tratamientos`
    })),
    document.getElementById(`multimedia`)?.scrollIntoView({
      behavior:`smooth`,
      block:`start`
    })
  },
  i=e=>({
    Ortodoncia:[
      `Alineación progresiva`,
      `Mejor mordida`,
      `Sonrisa armónica`,
      `Plan personalizado`
    ],
    "Limpieza dental profunda":[
      `Prevención de sarro`,
      `Encías saludables`,
      `Sensación de frescura`,
      `Cuidado preventivo`
    ],
    "Blanqueamiento dental":[
      `Tono más claro`,
      `Resultado estético`,
      `Procedimiento controlado`,
      `Sonrisa renovada`
    ],
    "Carillas dentales":[
      `Diseño de sonrisa`,
      `Forma y color`,
      `Acabado natural`,
      `Alta estética`
    ],
    Endodoncia:[
      `Alivio del dolor`,
      `Conserva la pieza`,
      `Sistema moderno`,
      `Mayor precisión`
    ]
  })[
    e
  ]||[
    `Evaluación profesional`,
    `Tecnología moderna`,
    `Trato personalizado`,
    `Resultados naturales`
  ],
  a=(e,
  t=!1)=>(0,
  V.jsx)(`div`,
  {
    className:`overflow-hidden bg-slate-950 shadow-2xl shadow-slate-900/20 ${
      t?`mt-3 rounded-[
        1.6rem
      ]`:`rounded-[
        2rem
      ]`
    }`,
    children:(0,
    V.jsxs)(`div`,
    {
      className:`relative overflow-hidden ${
        t?`min-h-[
          360px
        ]`:`h-[
          330px
        ] md:h-[
          460px
        ]`
      }`,
      children:[
        (0,
        V.jsx)(`img`,
        {
          src:e.image,
          alt:e.title,
          className:`absolute inset-0 h-full w-full object-cover`,
          style:{
            objectPosition:`center 42%`
          }
        }),
        (0,
        V.jsx)(`div`,
        {
          className:`absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent`
        }),
        (0,
        V.jsxs)(`div`,
        {
          className:`absolute bottom-0 left-0 right-0 ${
            t?`p-5`:`p-6 md:p-8`
          }`,
          children:[
            (0,
            V.jsx)(`p`,
            {
              className:`mb-3 inline-flex rounded-full border border-white/20 bg-white/15 px-4 py-2 text-xs font-bold text-blue-100 backdrop-blur-xl`,
              children:`Tratamiento destacado`
            }),
            (0,
            V.jsx)(`h3`,
            {
              className:`font-display font-black text-white ${
                t?`text-3xl`:`text-3xl md:text-5xl`
              }`,
              children:e.title
            }),
            (0,
            V.jsx)(`p`,
            {
              className:`mt-3 max-w-2xl font-manrope text-sm leading-7 text-slate-200 md:text-base`,
              children:e.text
            }),
            (0,
            V.jsx)(`div`,
            {
              className:`mt-5 flex flex-wrap gap-2 md:gap-3`,
              children:i(e.title).slice(0,
              3).map(e=>(0,
              V.jsx)(`span`,
              {
                className:`rounded-full border border-white/18 bg-white/12 px-3 py-2 text-xs font-bold text-white backdrop-blur-xl md:px-4 md:text-sm`,
                children:e
              },
              e))
            })
          ]
        })
      ]
    })
  });
  return(0,
  V.jsxs)(`section`,
  {
    id:`tratamientos`,
    className:`dental-light-section px-6 py-16 text-slate-950 md:py-20`,
    children:[
      (0,
      V.jsx)(`div`,
      {
        className:`absolute inset-0 bg-[
          radial-gradient(circle_at_15%_20%,
          rgba(59,
          130,
          246,
          .11),
          transparent_32%),
          radial-gradient(circle_at_90%_85%,
          rgba(14,
          165,
          233,
          .09),
          transparent_34%)
        ] pointer-events-none`
      }),
      (0,
      V.jsxs)(`div`,
      {
        className:`relative z-10 mx-auto max-w-7xl`,
        children:[
          (0,
          V.jsxs)(`div`,
          {
            className:`mx-auto mb-8 max-w-3xl text-center`,
            children:[
              (0,
              V.jsx)(`p`,
              {
                className:`mb-4 inline-flex rounded-full border border-blue-200 bg-blue-50 px-5 py-2 text-xs font-extrabold uppercase tracking-[
                  0.22em
                ] text-blue-700`,
                children:`Tratamientos`
              }),
              (0,
              V.jsxs)(`h2`,
              {
                className:`font-display text-4xl font-black leading-tight tracking-tight md:text-5xl`,
                children:[
                  `Conoce nuestros `,
                  (0,
                  V.jsx)(`span`,
                  {
                    className:`text-blue-600`,
                    children:`servicios integrales`
                  })
                ]
              }),
              (0,
              V.jsx)(`p`,
              {
                className:`mt-4 font-manrope text-base leading-7 text-slate-600 md:text-lg`,
                children:`Explora nuestros servicios de forma clara,
                 visual y ordenada.`
              })
            ]
          }),
          (0,
          V.jsxs)(`div`,
          {
            className:`grid gap-7 lg:grid-cols-[
              0.95fr_1.05fr
            ] lg:items-center`,
            children:[
              (0,
              V.jsx)(Y.div,
              {
                initial:{
                  opacity:0,
                  x:-24
                },
                whileInView:{
                  opacity:1,
                  x:0
                },
                viewport:{
                  once:!0,
                  amount:.25
                },
                transition:{
                  duration:.7
                },
                className:`grid gap-3 lg:grid-cols-2`,
                children:ad.map((n,
                r)=>{
                  let i=e===r;
                  return(0,
                  V.jsxs)(`div`,
                  {
                    className:`min-w-0`,
                    children:[
                      (0,
                      V.jsxs)(`button`,
                      {
                        onClick:()=>t(r),
                        className:`flex min-h-[
                          76px
                        ] w-full items-center gap-3 rounded-3xl border px-4 py-3 text-left transition-all duration-300 ${
                          i?`border-blue-500 bg-blue-50 shadow-xl shadow-blue-200/70`:`border-slate-200 bg-white/95 shadow-lg shadow-slate-900/5 hover:-translate-y-0.5 hover:border-blue-300`
                        }`,
                        "aria-expanded":i,
                        children:[
                          (0,
                          V.jsx)(`span`,
                          {
                            className:`grid h-10 w-10 shrink-0 place-items-center rounded-2xl text-base font-black ${
                              i?`bg-blue-600 text-white`:`bg-blue-50 text-blue-500`
                            }`,
                            children:im[
                              r%im.length
                            ]
                          }),
                          (0,
                          V.jsx)(`span`,
                          {
                            className:`flex-1 text-sm font-extrabold leading-snug text-slate-950 md:text-base`,
                            children:n.title
                          }),
                          (0,
                          V.jsx)(`span`,
                          {
                            className:`text-lg font-black text-slate-400`,
                            children:i?`−`:`+`
                          })
                        ]
                      }),
                      i&&(0,
                      V.jsx)(Y.div,
                      {
                        initial:{
                          opacity:0,
                          y:-8
                        },
                        animate:{
                          opacity:1,
                          y:0
                        },
                        transition:{
                          duration:.35
                        },
                        className:`lg:hidden`,
                        children:a(n,
                        !0)
                      })
                    ]
                  },
                  n.title)
                })
              }),
              (0,
              V.jsx)(Y.div,
              {
                initial:{
                  opacity:0,
                  x:24
                },
                animate:{
                  opacity:1,
                  x:0
                },
                transition:{
                  duration:.55
                },
                className:`hidden lg:block`,
                children:a(n)
              },
              n.title)
            ]
          }),
          (0,
          V.jsx)(`div`,
          {
            className:`mt-10 text-center`,
            children:(0,
            V.jsxs)(`button`,
            {
              type:`button`,
              onClick:r,
              className:`inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-extrabold text-white shadow-xl shadow-blue-500/25 transition hover:-translate-y-0.5 hover:shadow-blue-500/40`,
              children:[
                `Ver videos de tratamientos`,
                (0,
                V.jsx)(`span`,
                {
                  children:`▶`
                })
              ]
            })
          })
        ]
      })
    ]
  })
}var om=[
  {
    title:`Scanner Intraoral con IA`,
    subtitle:`Diagnóstico digital de alta precisión`,
    label:`Flujo digital 3D`,
    number:`01`,
    image:`/assets/scanner-ai-BiuEOb0c.webp`,
    secondaryImage:`/assets/scanner-paciente-CcxetXhC.webp`,
    imageAlt:`Scanner intraoral con inteligencia artificial`,
    description:`Olvídate de los moldes convencionales. Nuestro escáner intraoral captura imágenes digitales de alta precisión de forma rápida,
     cómoda y segura. Combinado con inteligencia artificial e impresión 3D,
     permite planificar tratamientos personalizados con mayor precisión,
     eficiencia y comodidad para nuestros pacientes.`,
    benefits:[
      `Sin moldes tradicionales`,
      `Escaneo rápido y cómodo`,
      `Mayor precisión digital`,
      `Planificación con IA`,
      `Compatible con impresión 3D`
    ]
  },
  {
    title:`Rayos X Digital con IA`,
    subtitle:`Radiografía digital inteligente`,
    label:`Diagnóstico inmediato`,
    number:`02`,
    image:`/assets/rayos-paciente-6EyDWXfR.webp`,
    secondaryImage:`/assets/rayos-portatil-CaXGM3Il.webp`,
    imageAlt:`Rayos X digital portátil con apoyo de IA`,
    description:`Nuestro sistema de Rayos X Digital Portátil permite obtener imágenes instantáneas con gran calidad diagnóstica. La integración de inteligencia artificial ayuda a mejorar la evaluación clínica,
     permitiendo diagnósticos más rápidos,
     precisos y cómodos para nuestros pacientes.`,
    benefits:[
      `Imágenes instantáneas`,
      `Menor tiempo de espera`,
      `Diagnóstico más preciso`,
      `Tecnología portátil`,
      `Mayor comodidad para el paciente`
    ]
  },
  {
    title:`Área de Bioseguridad y Esterilización`,
    subtitle:`Protección y seguridad en cada atención`,
    label:`Ambiente controlado`,
    number:`03`,
    image:`/assets/bioseguridad-BX4m0Hnz.webp`,
    secondaryImage:`/assets/bioseguridad-alt-DOJU6XLF.webp`,
    imageAlt:`Área de bioseguridad y esterilización dental`,
    description:`Disponemos de autoclave,
     selladora y protocolos estrictos de esterilización que garantizan instrumental completamente seguro para cada procedimiento. Nuestro compromiso con la bioseguridad brinda confianza,
     protección y tranquilidad a todos nuestros pacientes.`,
    benefits:[
      `Esterilización certificada`,
      `Instrumental seguro`,
      `Protocolos estrictos`,
      `Máxima protección`,
      `Ambiente controlado`
    ]
  },
  {
    title:`Control de Aerosoles`,
    subtitle:`Ambiente clínico más seguro`,
    label:`Succión extraoral`,
    number:`04`,
    image:`/assets/aerosol-equipo-B1LSS03K.webp`,
    secondaryImage:`/assets/aerosol-clinica-Dmvrr4Dz.webp`,
    imageAlt:`Unidad de succión extraoral para control de aerosoles`,
    description:`Contamos con una moderna unidad de succión extraoral que captura aerosoles,
     partículas y microorganismos generados durante los procedimientos odontológicos. Gracias a su sistema de filtración HEPA y esterilización UV,
     contribuye a mantener un ambiente más limpio,
     seguro y protegido para pacientes y profesionales.`,
    benefits:[
      `Captura de aerosoles`,
      `Filtración HEPA`,
      `Esterilización UV`,
      `Ambiente más limpio`,
      `Mayor protección clínica`
    ]
  }
],sm={
  hidden:{
    opacity:0,
    y:28
  },
  show:{
    opacity:1,
    y:0
  }
};
