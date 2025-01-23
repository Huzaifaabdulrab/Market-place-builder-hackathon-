function Input() {
  return (
    <div>
      <h2 className="flex items-center mt-[12%]   ml-[24px] ">
        <span className="bg-gray-300 w-[20px] h-[20px] rounded-full flex justify-center items-center">
          <span className="bg-blue-700 w-[10px] h-[10px] rounded-full"></span>
        </span>
        <span className="Pick font-semibold pl-2 text-[16px]">Pick-Up</span>
      </h2>
      <div className="w-[486px] h-[68px] mt-1 lg:flex justify-center items-center hidden  ">
        <div className="w-[126px] h-[68px] mt-[24px] ">
          <span className="text-[16px] font-bold ml-[24px]">Locations</span>
          <div className="text-[12px] text-lablelTxt ml-[20px]">
            <select name="#" id="#">
              <option value="#">Kota Semarang</option>
            </select>
          </div>
        </div>
        <div className="w-[68px] h-[2px] rotate-90   bg-rotateLine "></div>
        <div className="w-[126px] h-[68px] mt-[24px]">
          <span className="text-[16px] font-bold ml-[24px]">Date</span>
          <div className="text-[12px] text-lablelTxt ml-[20px]">
            <select name="#" id="#">
              <option value="#">20 July 2022</option>
            </select>
          </div>
        </div>
        <div className="w-[68px] h-[2px] rotate-90   bg-rotateLine "></div>
        <div className="w-[126px] h-[68px]  mt-[24px]">
          <span className="text-[16px] font-bold ml-[24px]">Time</span>
          <div className="text-[12px] text-lablelTxt ml-[20px]">
            <select name="#" id="#">
              <option value="#">07.00</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-4 lg:hidden ">
        <label htmlFor="location" className="ml-7 text-gray-600 mb-2">
          Location
        </label>
        <input
          type="text"
          placeholder="Location"
          className="w-80 ml-7 mb-4 p-2 rounded-md border border-pickUpText"
        />

        <label htmlFor="date" className="ml-7  text-gray-600 mb-2">
          Date
        </label>
        <input
          type="date"
          placeholder="Location"
          className="w-80 ml-7  mb-4  p-2 rounded-md border text-lablelTxt border-pickUpText"
        />

        <label htmlFor="location" className="ml-7 text-gray-600 mb-2">
          Location
        </label>
        <input
          type="time"
          placeholder=""
          className="w-80 ml-7   mb-4  p-2 rounded-md border text-lablelTxt border-pickUpText"
        />
      </div>

      <h2 className="flex items-center mt-[12%]   ml-[24px] ">
        <span className="bg-gray-300 w-[20px] h-[20px] rounded-full flex justify-center items-center">
          <span className="bg-blue-700 w-[10px] h-[10px] rounded-full"></span>
        </span>
        <span className="Pick font-semibold pl-2 text-[16px]">Pick-Up</span>
      </h2>
      <div className="w-[486px] h-[68px] mt-1 lg:flex justify-center items-center hidden  ">
        <div className="w-[126px] h-[68px] mt-[24px] ">
          <span className="text-[16px] font-bold ml-[24px]">Locations</span>
          <div className="text-[12px] text-lablelTxt ml-[20px]">
            <select name="#" id="#">
              <option value="#">Kota Semarang</option>
            </select>
          </div>
        </div>
        <div className="w-[68px] h-[2px] rotate-90   bg-rotateLine "></div>
        <div className="w-[126px] h-[68px] mt-[24px]">
          <span className="text-[16px] font-bold ml-[24px]">Date</span>
          <div className="text-[12px] text-lablelTxt ml-[20px]">
            <select name="#" id="#">
              <option value="#">20 July 2022</option>
            </select>
          </div>
        </div>
        <div className="w-[68px] h-[2px] rotate-90   bg-rotateLine "></div>
        <div className="w-[126px] h-[68px]  mt-[24px]">
          <span className="text-[16px] font-bold ml-[24px]">Time</span>
          <div className="text-[12px] text-lablelTxt ml-[20px]">
            <select name="#" id="#">
              <option value="#">07.00</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-4 lg:hidden ">
        <label htmlFor="location" className="ml-7 text-gray-600 mb-2">
          Location
        </label>
        <input
          type="text"
          placeholder="Location"
          className="w-80 ml-7 mb-4 p-2 rounded-md border border-pickUpText"
        />

        <label htmlFor="date" className="ml-7  text-gray-600 mb-2">
          Date
        </label>
        <input
          type="date"
          placeholder="Location"
          className="w-80 ml-7  mb-4  p-2 rounded-md border text-lablelTxt border-pickUpText"
        />

        <label htmlFor="location" className="ml-7 text-gray-600 mb-2">
          Location
        </label>
        <input
          type="time"
          placeholder=""
          className="w-80 ml-7   mb-4  p-2 rounded-md border text-lablelTxt border-pickUpText"
        />
      </div>
    </div>
  );
}

export default Input;
