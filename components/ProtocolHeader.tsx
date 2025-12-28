import React from 'react';

interface ProtocolHeaderProps {
  productId: string;
  protocolNumber: React.ReactNode;
}

export const ProtocolHeader: React.FC<ProtocolHeaderProps> = ({ productId, protocolNumber }) => {
  const displayId = productId ? productId : <span className="text-red-500">货号N/A</span>;

  return (
    <div className="border-b-2 border-red-500 mb-6 pb-2">
      <div className="flex flex-col md:flex-row justify-between items-center text-sm md:text-xs text-gray-700">
        <div className="flex items-center gap-2 mb-2 md:mb-0">
           <div className="font-bold text-lg text-blue-600">皓元医药 <br/><span className="text-xs text-gray-500">ChemExpress</span></div>
        </div>
        <div className="text-center md:text-right">
          <div className="grid grid-cols-2 gap-x-8 border border-gray-300 p-2 bg-white">
            <div className="text-left border-r border-gray-300 pr-4">
              <div className="font-bold">{displayId} 含量和鉴别检验方法验证方案</div>
              <div className="text-xs text-gray-500">Protocol for Validation of {displayId} Assay and Identification Determination</div>
            </div>
            <div className="text-left pl-4">
              <div><span className="font-semibold">方案号 Protocol #:</span> {protocolNumber}</div>
              <div>Page <span className="font-mono">Current</span> of 27</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};