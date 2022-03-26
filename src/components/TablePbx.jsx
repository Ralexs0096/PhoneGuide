import { useState, useEffect } from 'react'

const TablaPbx = () => {
  const [dataPbx, setDataPbx] = useState([])
  const [inputPbx, setInputPbx] = useState('')
  const [currentFactory, setCurrentFactory] = useState('Planta 1')
  const [currentPage, setCurrentPage] = useState(0)
  const [dataPbxFiltered, setDataPbxFiltered] = useState([])

  const getData = async () => {
    const resultado = await fetch('http://localhost:3000/api/pbx')
    const data = await resultado.json()
    setDataPbx(data)
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    filterPbxByFactory()
  }, [currentFactory, dataPbx])

  useEffect(() => {
    filterByUserName()
  }, [inputPbx])

  const handleFactoryChange = ({ target }) => {
    setCurrentFactory(target.value)
  }

  const filterPbxByFactory = () => {
    const factoryData = dataPbx.filter(
      factory => factory.factory === currentFactory
    )
    setDataPbxFiltered(factoryData)
  }

  const filterByUserName = () => {
    const UserData = dataPbx.filter(
      factory =>
        factory.user.toLowerCase().includes(inputPbx.toLocaleLowerCase()) ||
        factory.dept.toLowerCase().includes(inputPbx.toLocaleLowerCase())
    )
    setCurrentPage(0)
    setDataPbxFiltered(UserData)
    if (inputPbx === '') {
      filterPbxByFactory()
    }
  }

  const extensionesElements = dataPbxFiltered.map(
    ({ ext, user, position, dept, state }) => (
      <tr key={ext}>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <div className="flex items-center">
            <div className="flex-shrink-0"></div>
            <div className="ml-3">
              <p className="text-gray-900 whitespace-no-wrap">{user}</p>
            </div>
          </div>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{position}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{dept}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{ext}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
            ></span>
            <span className="relative">{state ? 'Activo' : ''}</span>
          </span>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm"></td>
      </tr>
    )
  )

  return (
    <div>
      <div className="mx-auto px-4 sm:px-8 max-w-3xl">
        <div className="py-8">
          <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
            <h2 className="text-2xl leading-tight">Extensiones PBX</h2>
            <div className="text-end">
              <form className="flex w-full max-w-sm space-x-3">
                <div className=" relative ">
                  <input
                    type="text"
                    id="form-subscribe-Filter"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Encuentra una Extension"
                    onChange={e => setInputPbx(e.target.value)}
                  />
                </div>
                <div className=" relative ">
                  <select
                    value={currentFactory}
                    onChange={handleFactoryChange}
                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 shadow-sm text-base"
                  >
                    <option value="Planta 1">Planta 1</option>
                    <option value="Planta 2">Planta 2</option>
                    {/* <option value="Planta 3">Planta 3</option> */}
                    <option value="Planta 4">Planta 4</option>
                    <option value="Planta 5">Planta 5</option>
                  </select>
                </div>
              </form>
            </div>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Usuario
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Cargo
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Area
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Extension
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Estado
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    ></th>
                  </tr>
                </thead>
                <tbody>{extensionesElements}</tbody>
              </table>

              <div className="flex justify-between bg-white w-full">
                <a
                  href="/"
                  className="inline-flex items-center py-2 px-4 mr-3 text-sm font-medium text-gray-700 bg-white  border border-transparent hover:bg-gray-200 hover:text-gray-700"
                >
                  <svg
                    className="mr-2 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  Anterior
                </a>
                <a
                  href="/"
                  className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-700 bg-white  border border-transparent hover:bg-gray-200 hover:text-gray-700 "
                >
                  Siguiente
                  <svg
                    className="ml-2 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TablaPbx
