import React from 'react';
import { NavItem } from '../types';
import { Database, FileText } from 'lucide-react';

interface SidebarProps {
  navItems: NavItem[];
  activeId: string;
  onSelect: (id: string) => void;
  isOpen: boolean;
  currentView: 'protocol' | 'dictionary';
  onChangeView: (view: 'protocol' | 'dictionary') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ navItems, activeId, onSelect, isOpen, currentView, onChangeView }) => {
  return (
    <div className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out z-30 w-72 bg-gray-50 border-r border-gray-200 flex flex-col h-full`}>
      <div className="p-4 border-b border-gray-200 bg-white">
        <h2 className="font-bold text-gray-800 text-lg mb-1">项目导航</h2>
        <p className="text-xs text-gray-500">Project Navigation</p>
      </div>

      <div className="p-2 space-y-1 bg-white border-b border-gray-200">
        <button
          onClick={() => onChangeView('protocol')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            currentView === 'protocol'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <FileText size={18} />
          方案文档 Protocol
        </button>
        <button
          onClick={() => onChangeView('dictionary')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            currentView === 'dictionary'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Database size={18} />
          数据映射字典 Dictionary
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-2">
        {currentView === 'protocol' ? (
          <>
            <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
              目录 Table of Contents
            </div>
            <nav className="px-2 space-y-0.5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSelect(item.id)}
                  className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${
                    activeId === item.id
                      ? 'bg-blue-100 text-blue-800 font-semibold'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  } ${item.isSubItem ? 'pl-8 text-xs' : 'font-medium'}`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </>
        ) : (
          <div className="px-4 py-4 text-sm text-gray-500 text-center">
            查看所有系统变量与前端映射关系。<br/>
            View all system variables and their UI mappings.
          </div>
        )}
      </div>
      <div className="p-4 border-t border-gray-200 text-xs text-gray-500 bg-white">
        &copy; 2024 ChemExpress
      </div>
    </div>
  );
};
