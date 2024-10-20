import React from "react";

const Loader: React.FC = () => {
	return (
		<div className="flex items-center justify-center h-screen fixed left-[50%] top-[50%] transform -translate-x-[50%] -translate-y-[50%]">
			<div className="flex space-x-2">
				<div className="h-5 w-5 bg-blue-500 rounded-full animate-bounce"></div>
				<div className="h-5 w-5 bg-blue-500 rounded-full animate-bounce200"></div>
				<div className="h-5 w-5 bg-blue-500 rounded-full animate-bounce400"></div>
			</div>
		</div>
	);
};

export default Loader;
