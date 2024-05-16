const Logo = () => {
  return (
    <nav className="border-gray-200 px-2 py-2.5 rounded  ">
      <div className="flex items-center text-text dark:text-active">
        <svg
          fill="currentcolor"
          height="800px"
          width="800px"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="h-7 w-7"
        >
          <g>
            <g>
              <path
                d="M503.467,311.467c4.719,0,8.533-3.814,8.533-8.533V268.8c0-4.719-3.814-8.533-8.533-8.533H179.2
			c-4.719,0-8.533,3.814-8.533,8.533v34.133c0,4.719,3.814,8.533,8.533,8.533h128v128h-25.6V374.46
			c0-11.213-9.114-20.326-20.326-20.326H233.66c-11.213,0-20.326,9.114-20.326,20.326v65.007h-93.867V217.6H179.2
			c4.719,0,8.533-3.814,8.533-8.533V89.6c0-4.719-3.814-8.533-8.533-8.533h-42.667V64c0-4.719-3.814-8.533-8.533-8.533H59.733
			c-4.719,0-8.533,3.814-8.533,8.533v17.067H8.533C3.814,81.067,0,84.881,0,89.6v119.467c0,4.719,3.814,8.533,8.533,8.533h59.733
			v221.867H8.533C3.814,439.467,0,443.281,0,448c0,4.719,3.814,8.533,8.533,8.533H76.8h34.133h110.933h51.2h42.667h51.2H435.2h51.2
			h17.067c4.719,0,8.533-3.814,8.533-8.533c0-4.719-3.814-8.533-8.533-8.533h-8.533v-128H503.467z M68.267,106.667V89.6V72.533h51.2
			V89.6v17.067H68.267z M477.867,439.467h-34.133v-76.8c0-4.719-3.814-8.533-8.533-8.533h-68.267c-4.719,0-8.533,3.814-8.533,8.533
			v76.8h-34.133v-128h153.6V439.467z"
              />
            </g>
          </g>
        </svg>
        {/* <span className="text-xl font-medium whitespace-nowrap dark:text-white">
          Admin{" "}
        </span> */}
      </div>
    </nav>
  );
};

export default Logo;
