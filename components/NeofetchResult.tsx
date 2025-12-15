import React from 'react';

// Make sure the component is named 'NeofetchResult', not 'Terminal'
const NeofetchResult = () => {
  // 1. The Raw String
  const asciiArt = `\${c1}              .'ccccc:.
         ,'ccccccccccccccc:.
      .';cccccccccccccccccccc:.
   .'cccccccccccccc\${c2}o@@@@b\${c1}ccccccc;
  .:ccccccccccccc\${c2}d@@\${c1}ccc\${c2}q@@:\${c1}cccccc,
 .:ccccccccccccc\${c2}@@@\${c1}ccccc\${c2}@@P\${c1}ccccccc;
,:cccccccccccccc\${c2}@@@\${c1}ccccccccccccccc:
ccccccccc\${c2}o@@@@@\${c1}c\${c2}@@@@@@@\${c1}ccccccccccc:
ccccccc\${c2}d@P\${c1}cccccc\${c2}@@@\${c1}ccccccccccccccc:
cccccc\${c2}@@o\${c1}ccccccc\${c2}@@@\${c1}ccccccccccccccc'
cccccc\${c2}q@@b\${c1}ccccc\${c2}@@@P\${c1}ccccccccccccc;
cccccccc\${c2}q@@@@@@@P\${c1}ccccccccccccc:,
'cccccccccccccccccccccccccc:.
 ;ccccccccccccccccccccc:,.`;

  // 2. Helper Function to Parse Colors
  const parseAscii = (art: string) => {
    const parts = art.split(/(\${c1}|\${c2})/g);
    let currentClass = "text-blue-500"; 

    return parts.map((part, index) => {
      if (part === "${c1}") {
        currentClass = "text-blue-500";
        return null;
      } else if (part === "${c2}") {
        currentClass = "text-white";
        return null;
      }
      return (
        <span key={index} className={currentClass}>
          {part}
        </span>
      );
    });
  };

  // 3. System Info Data
  const sysInfo = [
    { key: "OS", val: "Fedora Linux 43" },
    { key: "Host", val: "ThinkPad E16 Gen 1" },
    { key: "Kernel", val: "CS_Undergrad_v2.0" },
    { key: "Uptime", val: "20 years, 7 months" },
    { key: "Packages", val: "15 (Java, C, MIPS)" },
    { key: "Shell", val: "zsh 5.8" },
    { key: "Resolution", val: "1920x1200" },
    { key: "CPU", val: "AMD Ryzen 5 7530U" },
    { key: "Memory", val: "74% (Attendance Critical)" },
  ];

  const paletteColors = [
    "bg-black", "bg-red-500", "bg-green-500", "bg-yellow-500", 
    "bg-blue-500", "bg-fuchsia-500", "bg-cyan-500", "bg-white"
  ];

  // Note: No onClick={handleFocus} here. The parent Terminal component handles that.
  return (
    <div className="flex flex-row gap-6 font-mono text-sm mt-2 mb-4 select-none">
      {/* Left Column: ASCII Art */}
      <div className="whitespace-pre leading-tight text-blue-500">
        {parseAscii(asciiArt)}
      </div>

      {/* Right Column: System Info */}
      <div className="flex flex-col justify-center space-y-1">
        {/* User@Host Header */}
        <div className="mb-2">
          <span className="text-blue-500 font-bold underline decoration-blue-500 underline-offset-4">
            guest@hans-thinkpad
          </span>
        </div>

        {/* Info Rows */}
        {sysInfo.map((item, idx) => (
          <div key={idx} className="flex flex-row">
            <span className="text-blue-400 font-bold mr-2">{item.key}:</span>
            <span className="text-gray-300">{item.val}</span>
          </div>
        ))}

        {/* Color Palette */}
        <div className="flex flex-row gap-2 mt-3 pt-2">
          {paletteColors.map((color, idx) => (
            <div key={idx} className={`w-4 h-4 rounded-sm ${color}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NeofetchResult;