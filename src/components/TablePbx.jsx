import { useState, useEffect, useCallback } from 'react'
import TableBody from './TableBody'

const plantas = ['Planta 1', 'Planta 2', 'Planta 4', 'Planta 5']

const tblStylingOpts = {
  header:
    'px-5 py-3 bg-white  border-b border-gray-200 text-white text-center font-semibold text-sm uppercase bg-gray-900',
  input:
    'border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent',
  select:
    ' border-transparent flex-1 appearance-none block border border-gray-300 w-full py-2 px-4 bg-white bg-clip-padding text-gray-700 shadow-sm text-base font-light transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none',
}

const TablaPbx = () => {
  const [dataPbx, setDataPbx] = useState([])
  const [dataPbxFiltered, setDataPbxFiltered] = useState([])
  const [pagination, setPagination] = useState([])

  const [inputPbx, setInputPbx] = useState('')
  const [currentFactory, setCurrentFactory] = useState('Planta 1')
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [buttonState, setButtonState] = useState({
    next: false,
    prev: true,
  })

  const ITEM_PER_PAGE = 6

  const getData = useCallback(async () => {
    const resultado = await fetch('http://localhost:3000/api/pbx')
    const data = await resultado.json()
    setDataPbx(data)
  }, [])

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    filterPbxByFactory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFactory, dataPbx])

  useEffect(() => {
    setPagination([...dataPbxFiltered].splice(0, ITEM_PER_PAGE))
    const totalPages = dataPbxFiltered.length / ITEM_PER_PAGE
    setTotalPages(Math.ceil(totalPages))
  }, [dataPbxFiltered])

  useEffect(() => {
    filterByUserName()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputPbx])

  const handleFactoryChange = ({ target }) => {
    setCurrentFactory(target.value)
    setCurrentPage(0)
    setButtonState({
      next: false,
      prev: true,
    })
  }

  const filterPbxByFactory = useCallback(() => {
    const factoryData = dataPbx.filter(
      factory => factory.factory === currentFactory
    )
    setDataPbxFiltered(factoryData)
  }, [currentFactory, dataPbx])

  const filterByUserName = () => {
    const UserData = dataPbx.filter(
      factory =>
        factory.user.toLowerCase().includes(inputPbx.toLocaleLowerCase()) ||
        factory.dept.toLowerCase().includes(inputPbx.toLocaleLowerCase())
    )
    setCurrentPage(0)
    setPagination(UserData)
    setButtonState({
      next: true,
      prev: true,
    })
    if (inputPbx === '') {
      filterPbxByFactory()
      setCurrentPage(0)
      setButtonState({
        next: false,
        prev: true,
      })
    }
  }

  const nextHandler = () => {
    const totalElements = dataPbxFiltered.length
    const totalPages = totalElements / ITEM_PER_PAGE
    const nextPage = currentPage + 1
    const firstIndex = nextPage * ITEM_PER_PAGE

    if (currentPage + 1 > 0 && currentPage < totalPages) {
      setButtonState({
        next: false,
        prev: false,
      })
    }

    if (nextPage + 1 === Math.ceil(totalPages)) {
      setButtonState({
        next: true,
        prev: false,
      })
    }

    setPagination([...dataPbxFiltered].splice(firstIndex, ITEM_PER_PAGE))
    setCurrentPage(nextPage)
  }

  const prevHandler = () => {
    const totalElements = dataPbxFiltered.length
    const totalPages = totalElements / ITEM_PER_PAGE
    const prevPage = currentPage - 1
    const firstIndex = prevPage * ITEM_PER_PAGE

    if (currentPage + 1 > 0 && currentPage < totalPages) {
      setButtonState({
        next: false,
        prev: false,
      })
    }

    if (currentPage === 1) {
      setButtonState({
        next: false,
        prev: true,
      })
    }

    setPagination([...dataPbxFiltered].splice(firstIndex, ITEM_PER_PAGE))
    setCurrentPage(prevPage)
  }

  return (
    <div>
      <div className="mx-auto px-4 sm:px-8 w-10/12">
        <div className="py-8">
          {/* Filter Table*/}
          <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
            <h2 className="text-2xl leading-tight">Extensiones PBX</h2>
            <div className="text-end">
              <form className="flex w-full max-w-sm space-x-3">
                <div className=" relative ">
                  <input
                    type="text"
                    id="form-subscribe-Filter"
                    className={tblStylingOpts.input}
                    placeholder="Encuentra una Extension"
                    onChange={e => setInputPbx(e.target.value)}
                  />
                </div>
                <div className=" relative ">
                  <select
                    value={currentFactory}
                    onChange={handleFactoryChange}
                    className={tblStylingOpts.select}
                  >
                    {plantas.map(el => (
                      <option key={el} value={el}>
                        {el}
                      </option>
                    ))}
                  </select>
                </div>
              </form>
            </div>
          </div>
          <div className="flex justify-end text-gray-600 text-xs w-full my-2 -mx-4">
            <p>
              Pagina {currentPage + 1} - {totalPages}
            </p>
          </div>
          <div className="py-2 overflow-x-auto">
            <div className="min-w-full shadow overflow-hidden">
              <table className="leading-normal min-w-full">
                <thead>
                  <tr>
                    <th scope="col" className={tblStylingOpts.header}>
                      Usuario
                    </th>
                    <th scope="col" className={tblStylingOpts.header}>
                      Cargo
                    </th>
                    <th scope="col" className={tblStylingOpts.header}>
                      Area
                    </th>
                    <th scope="col" className={tblStylingOpts.header}>
                      Extension
                    </th>
                    <th scope="col" className={tblStylingOpts.header}>
                      Estado
                    </th>
                  </tr>
                </thead>
                {/* Body Content */}
                <tbody>
                  {pagination.map(el => (
                    <TableBody key={el.ext} {...el} />
                  ))}
                </tbody>
              </table>

              {/* Pagination Footer */}
              <div className="flex justify-between bg-gray-400 w-full">
                <button
                  disabled={buttonState.prev}
                  onClick={prevHandler}
                  className="inline-flex items-center py-2 px-4 mr-3 text-sm font-medium text-white bg-transparent  border border-transparent  hover:text-gray-900"
                >
                  <svg
                    className="mr-2 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"></path>
                  </svg>
                  Anterior
                </button>
                <button
                  onClick={nextHandler}
                  disabled={buttonState.next}
                  className="inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-transparent  border border-transparent hover:text-gray-900"
                >
                  Siguiente
                  <svg
                    className="ml-2 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TablaPbx
