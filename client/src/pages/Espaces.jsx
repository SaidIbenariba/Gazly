import Map from "../components/Map";
import { Card } from "@material-tailwind/react";
import responsable from "../assets/responsable.jpg";
import { IoCheckmarkOutline } from "react-icons/io5";
import { Input } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { IoIosRefresh } from "react-icons/io";
import { IoHourglassOutline } from "react-icons/io5";
import profile from "../assets/22_Profile.jpg";
import { useState } from "react";
const Espaces = () => {
  const [observation, setObservation] = useState([
    { status: "in progress", data: "" },
  ]);
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex flex-row w-full md:w-72">
        <form className=" w-11/12 md:10/12">
          <Input
            label="Search"
            className="flex flex-col justify-center items-center rounded-r-none border-r-0"
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            placeholder="search..."
            // onChange={(e) => {
            //   setSearch(e.target.value);
            // }}
          />
        </form>
        <div className="w-1/12 md:w-[40px] flex justify-center items-center bg-black  text-white cursor-pointer rounded-r-md ">
          <IoIosRefresh />
        </div>
      </div>
      <div className="flex  gap-4 flex-col xl:flex-row xl:h-screen">
        {/* <h2 className="h2 xl:">Observation List</h2> */}

        <div className="h-full">
          <div
            className="overflow-y-scroll scrol h-full flex flex-col gap-2 "
            id="cart-container"
          >
            <Card className="bg-green-400 rounded-sm flex-row items-center justify-between p-2">
              <div className="flex flex-row items-start gap-5" id="profile">
                <div className="" id="responsable-image">
                  <img
                    className="w-[100px] h-[100px] "
                    src={profile}
                    alt="just profile"
                  />
                </div>
                <div className="flex flex-col text-text" id="description">
                  <span className=" text-lg font-bold"> Said ibenariba</span>
                  <span> #90 </span>
                </div>
              </div>
              <div id="status">
                {/* Obeservation status 
              { done vert color, in progress } */}
                {/* { switch ()} */}
                <span className="text-xl ">
                  <IoCheckmarkOutline
                    color="black"
                    fontSize="4em"
                    strokeWidth="1"
                  />
                </span>
              </div>
            </Card>
            <Card className="bg-green-400 rounded-sm flex-row items-center justify-between p-2">
              <div className="flex flex-row items-start gap-5" id="profile">
                <div className="w-[100px] h-[100px]" id="responsable-image">
                  <img
                    className="w-[100px] h-[100px]  "
                    src={responsable}
                    alt=""
                  />
                </div>
                <div className="flex flex-col text-text" id="description">
                  <span className=" text-lg font-bold"> Said ibenariba</span>
                  <span> #90 </span>
                </div>
              </div>
              <div id="status">
                {/* Obeservation status 
              { done vert color, in progress } */}
                {/* { switch ()} */}
                <span className="text-xl ">
                  <IoCheckmarkOutline
                    color="black"
                    fontSize="4em"
                    strokeWidth="1"
                  />
                </span>
              </div>
            </Card>
            <Card className="bg-red-400 rounded-sm flex-row items-center justify-between p-2">
              <div className="flex flex-row items-start gap-5" id="profile">
                <div className="" id="responsable-image">
                  <img
                    className="w-[100px] h-[100px] "
                    src={responsable}
                    alt=""
                  />
                </div>
                <div className="flex flex-col text-text" id="description">
                  <span className=" text-lg font-bold"> Said ibenariba</span>
                  <span> #90 </span>
                </div>
              </div>
              <div id="status">
                {/* Obeservation status 
              { done vert color, in progress } */}
                {/* { switch ()} */}
                {observation[0].status === "done" ? (
                  <span className="text-xl">
                    <IoCheckmarkOutline
                      color="black"
                      fontSize="4em"
                      strokeWidth="1"
                    />
                  </span>
                ) : (
                  <span className="text-xl">
                    <IoHourglassOutline
                      color="black"
                      fontSize="4em"
                      strokeWidth="1"
                    />
                  </span>
                )}
              </div>
            </Card>
            <Card className="bg-green-400 rounded-sm flex-row items-center justify-between p-2">
              <div className="flex flex-row items-start gap-5" id="profile">
                <div className="" id="responsable-image">
                  <img
                    className="w-[100px] h-[100px] "
                    src={responsable}
                    alt=""
                  />
                </div>
                <div className="flex flex-col text-text" id="description">
                  <span className=" text-lg font-bold"> Said ibenariba</span>
                  <span> #90 </span>
                </div>
              </div>
              <div id="status">
                {/* Obeservation status 
              { done vert color, in progress } */}
                {/* { switch ()} */}
                <span className="text-xl ">
                  <IoCheckmarkOutline
                    color="black"
                    fontSize="4em"
                    strokeWidth="1"
                  />
                </span>
              </div>
            </Card>
            <Card className="bg-green-400 rounded-sm flex-row items-center justify-between p-2">
              <div className="flex flex-row items-start gap-5" id="profile">
                <div className="" id="responsable-image">
                  <img
                    className="w-[100px] h-[100px] "
                    src={responsable}
                    alt=""
                  />
                </div>
                <div className="flex flex-col text-text" id="description">
                  <span className=" text-lg font-bold"> Said ibenariba</span>
                  <span> #90 </span>
                </div>
              </div>
              <div id="status">
                {/* Obeservation status 
              { done vert color, in progress } */}
                {/* { switch ()} */}
                <span className="text-xl ">
                  <IoCheckmarkOutline
                    color="black"
                    fontSize="4em"
                    strokeWidth="1"
                  />
                </span>
              </div>
            </Card>
            <Card className="bg-green-400 rounded-sm flex-row items-center justify-between p-2">
              <div className="flex flex-row items-start gap-5" id="profile">
                <div className="" id="responsable-image">
                  <img
                    className="w-[100px] h-[100px] "
                    src={responsable}
                    alt=""
                  />
                </div>
                <div className="flex flex-col text-text" id="description">
                  <span className=" text-lg font-bold"> Said ibenariba</span>
                  <span> #90 </span>
                </div>
              </div>
              <div id="status">
                {/* Obeservation status 
              { done vert color, in progress } */}
                {/* { switch ()} */}
                <span className="text-xl ">
                  <IoCheckmarkOutline
                    color="black"
                    fontSize="4em"
                    strokeWidth="1"
                  />
                </span>
              </div>
            </Card>
            <Card className="bg-green-400 rounded-sm flex-row items-center justify-between p-2">
              <div className="flex flex-row items-start gap-5" id="profile">
                <div className="" id="responsable-image">
                  <img
                    className="w-[100px] h-[100px] "
                    src={responsable}
                    alt=""
                  />
                </div>
                <div className="flex flex-col text-text" id="description">
                  <span className=" text-lg font-bold"> Said ibenariba</span>
                  <span> #90 </span>
                </div>
              </div>
              <div id="status">
                {/* Obeservation status 
              { done vert color, in progress } */}
                {/* { switch ()} */}
                <span className="text-xl ">
                  <IoCheckmarkOutline
                    color="black"
                    fontSize="4em"
                    strokeWidth="1"
                  />
                </span>
              </div>
            </Card>
            <Card className="bg-green-400 rounded-sm flex-row items-center justify-between p-2">
              <div className="flex flex-row items-start gap-5" id="profile">
                <div className="" id="responsable-image">
                  <img
                    className="w-[100px] h-[100px] "
                    src={responsable}
                    alt=""
                  />
                </div>
                <div className="flex flex-col text-text" id="description">
                  <span className=" text-lg font-bold"> Said ibenariba</span>
                  <span> #90 </span>
                </div>
              </div>
              <div id="status">
                {/* Obeservation status 
              { done vert color, in progress } */}
                {/* { switch ()} */}
                <span className="text-xl ">
                  <IoCheckmarkOutline
                    color="black"
                    fontSize="4em"
                    strokeWidth="1"
                  />
                </span>
              </div>
            </Card>
            <Card className="bg-green-400 rounded-sm flex-row items-center justify-between p-2">
              <div className="flex flex-row items-start gap-5" id="profile">
                <div className="" id="responsable-image">
                  <img
                    className="w-[100px] h-[100px] "
                    src={responsable}
                    alt=""
                  />
                </div>
                <div className="flex flex-col text-text" id="description">
                  <span className=" text-lg font-bold"> Said ibenariba</span>
                  <span> #90 </span>
                </div>
              </div>
              <div id="status">
                {/* Obeservation status 
              { done vert color, in progress } */}
                {/* { switch ()} */}
                <span className="text-xl ">
                  <IoCheckmarkOutline
                    color="black"
                    fontSize="4em"
                    strokeWidth="1"
                  />
                </span>
              </div>
            </Card>
            <Card className="bg-green-400 rounded-sm flex-row items-center justify-between p-2">
              <div className="flex flex-row items-start gap-5" id="profile">
                <div className="" id="responsable-image">
                  <img
                    className="w-[100px] h-[100px] "
                    src={responsable}
                    alt=""
                  />
                </div>
                <div className="flex flex-col text-text" id="description">
                  <span className=" text-lg font-bold"> Said ibenariba</span>
                  <span> #90 </span>
                </div>
              </div>
              <div id="status">
                {/* Obeservation status 
              { done vert color, in progress } */}
                {/* { switch ()} */}
                <span className="text-xl ">
                  <IoCheckmarkOutline
                    color="black"
                    fontSize="4em"
                    strokeWidth="1"
                  />
                </span>
              </div>
            </Card>
            <Card className="bg-green-400 rounded-sm flex-row items-center justify-between p-2">
              <div className="flex flex-row items-start gap-5" id="profile">
                <div className="" id="responsable-image">
                  <img
                    className="w-[100px] h-[100px] "
                    src={responsable}
                    alt=""
                  />
                </div>
                <div className="flex flex-col text-text" id="description">
                  <span className=" text-lg font-bold"> Said ibenariba</span>
                  <span> #90 </span>
                </div>
              </div>
              <div id="status">
                {/* Obeservation status 
              { done vert color, in progress } */}
                {/* { switch ()} */}
                <span className="text-xl ">
                  <IoCheckmarkOutline
                    color="black"
                    fontSize="4em"
                    strokeWidth="1"
                  />
                </span>
              </div>
            </Card>
            <Card className="bg-green-400 rounded-sm flex-row items-center justify-between p-2">
              <div className="flex flex-row items-start gap-5" id="profile">
                <div className="" id="responsable-image">
                  <img
                    className="w-[100px] h-[100px] "
                    src={responsable}
                    alt=""
                  />
                </div>
                <div className="flex flex-col text-text" id="description">
                  <span className=" text-lg font-bold"> Said ibenariba</span>
                  <span> #90 </span>
                </div>
              </div>
              <div id="status">
                {/* Obeservation status 
              { done vert color, in progress } */}
                {/* { switch ()} */}
                <span className="text-xl ">
                  <IoCheckmarkOutline
                    color="black"
                    fontSize="4em"
                    strokeWidth="1"
                  />
                </span>
              </div>
            </Card>
            <Card className="bg-green-400 rounded-sm flex-row items-center justify-between p-2">
              <div className="flex flex-row items-start gap-5" id="profile">
                <div className="" id="responsable-image">
                  <img
                    className="w-[100px] h-[100px] "
                    src={responsable}
                    alt=""
                  />
                </div>
                <div className="flex flex-col text-text" id="description">
                  <span className=" text-lg font-bold"> Said ibenariba</span>
                  <span> #90 </span>
                </div>
              </div>
              <div id="status">
                {/* Obeservation status 
              { done vert color, in progress } */}
                {/* { switch ()} */}
                <span className="text-xl ">
                  <IoCheckmarkOutline
                    color="black"
                    fontSize="4em"
                    strokeWidth="1"
                  />
                </span>
              </div>
            </Card>
            <Card className="bg-green-400 rounded-sm flex-row items-center justify-between p-2">
              <div className="flex flex-row items-start gap-5" id="profile">
                <div className="" id="responsable-image">
                  <img
                    className="w-[100px] h-[100px] "
                    src={responsable}
                    alt=""
                  />
                </div>
                <div className="flex flex-col text-text" id="description">
                  <span className=" text-lg font-bold"> Said ibenariba</span>
                  <span> #90 </span>
                </div>
              </div>
              <div id="status">
                {/* Obeservation status 
              { done vert color, in progress } */}
                {/* { switch ()} */}
                <span className="text-xl ">
                  <IoCheckmarkOutline
                    color="black"
                    fontSize="4em"
                    strokeWidth="1"
                  />
                </span>
              </div>
            </Card>
            <Card className="bg-green-400 rounded-sm flex-row items-center justify-between p-2">
              <div className="flex flex-row items-start gap-5" id="profile">
                <div className="" id="responsable-image">
                  <img
                    className="w-[100px] h-[100px] "
                    src={responsable}
                    alt=""
                  />
                </div>
                <div className="flex flex-col text-text" id="description">
                  <span className=" text-lg font-bold"> Said ibenariba</span>
                  <span> #90 </span>
                </div>
              </div>
              <div id="status">
                {/* Obeservation status 
              { done vert color, in progress } */}
                {/* { switch ()} */}
                <span className="text-xl ">
                  <IoCheckmarkOutline
                    color="black"
                    fontSize="4em"
                    strokeWidth="1"
                  />
                </span>
              </div>
            </Card>
          </div>
        </div>
        {/* <div className=" md:h-screen"> */}
        <h2 className="h2 mt-20 block xl:hidden">Factory Map</h2>
        <Map />
        {/* </div> */}
      </div>
    </div>
  );
};

export default Espaces;
