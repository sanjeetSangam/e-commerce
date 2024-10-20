import React from "react";
import NO_DATA from "../assets/no data.webp";

interface NoDataFoundProps {
	message?: string; // Optional message prop for customization
}

const NoDataFoundCommon: React.FC<NoDataFoundProps> = ({ message = "No Data Found" }) => {
	return (
		<div className="flex flex-col items-center justify-center h-full p-4">
			<div className="mb-4">
				<img
					src={NO_DATA}
					alt=""
					className="pointer-events-none select-none w-[250px] lg:w-[350px]"
				/>
			</div>
			<h2 className="text-xl font-semibold text-gray-700">{message}</h2>
		</div>
	);
};

export default NoDataFoundCommon;
