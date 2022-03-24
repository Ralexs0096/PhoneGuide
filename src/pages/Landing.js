import React from 'react'
import TablaPbx from '../components/TablePbx'

const Landing = () => {
  return (
    <>
      {/* <Navbar transparent /> */}
      <main>
        <div
          className="relative pt-16 pb-32 flex content-center items-center justify-center"
          style={{
            minHeight: '50vh',
          }}
        >
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage: `url(${require('../assets/img/Background-main.jpg')})`,
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-75 bg-black"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1 className="text-white font-semibold text-5xl">
                    Handsome
                  </h1>
                  <p className="mt-4 text-lg text-gray-300">
                    Puedes utilizar este recurso para consultar informacion y
                    realizar algunos procesos de una manera mas eficiente
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
            style={{ height: '70px', transform: 'translateZ(0)' }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-gray-300 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>

        {/* Aqui va  TablePbx */}

        <section className="pb-20 bg-gray-300">
          <TablaPbx />
        </section>

        {/* Aqui va el footer */}

        {/* <section className="relative block py-24 lg:pt-0 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300"></div>
              </div>
            </div>
          </div>
        </section> */}
      </main>
    </>
  )
}

export default Landing
