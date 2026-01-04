
import React from 'react';
import { NavItem } from '../types';
import { Database, FileText, ClipboardList, File, ChevronRight, LayoutTemplate } from 'lucide-react';

interface SidebarProps {
  navItems: NavItem[];
  activeId: string;
  onSelect: (id: string) => void;
  isOpen: boolean;
  currentView: 'protocol' | 'dictionary' | 'report' | 'document' | 'document_fields' | 'prd' | 'protocol_prd' | 'report_dictionary';
  onChangeView: (view: 'protocol' | 'dictionary' | 'report' | 'document' | 'document_fields' | 'prd' | 'protocol_prd' | 'report_dictionary') => void;
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
            currentView === 'protocol' || currentView === 'protocol_prd' || currentView === 'dictionary'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <FileText size={18} />
          方案文档 Protocol
        </button>
        <button
          onClick={() => onChangeView('report')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            currentView === 'report' || currentView === 'prd' || currentView === 'report_dictionary'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <ClipboardList size={18} />
          报告文档 Report
        </button>
        <button
          onClick={() => onChangeView('document')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            currentView === 'document' || currentView === 'document_fields'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <File size={18} />
          实验数据文档 Data Doc
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-2">
        {(currentView === 'protocol' || currentView === 'protocol_prd' || currentView === 'dictionary') ? (
          <>
            <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
              文档结构 Structure
            </div>
            <nav className="px-2 space-y-1 mb-2">
              <button
                onClick={() => onChangeView('protocol')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                  currentView === 'protocol'
                    ? 'bg-white text-blue-700 shadow-sm border border-gray-200 font-semibold'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <span>方案正文 Document</span>
                {currentView === 'protocol' && <ChevronRight size={14} />}
              </button>
              
              <button
                onClick={() => onChangeView('protocol_prd')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                  currentView === 'protocol_prd'
                    ? 'bg-white text-blue-700 shadow-sm border border-gray-200 font-semibold'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <span>规格说明书 PRD</span>
                {currentView === 'protocol_prd' && <ChevronRight size={14} />}
              </button>

              <button
                onClick={() => onChangeView('dictionary')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                  currentView === 'dictionary'
                    ? 'bg-white text-blue-700 shadow-sm border border-gray-200 font-semibold'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <span>数据映射字典 Dictionary</span>
                {currentView === 'dictionary' && <ChevronRight size={14} />}
              </button>
            </nav>

            {currentView === 'protocol' && (
              <>
                <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider border-t border-gray-100 pt-3">
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
            )}
            
            {currentView === 'protocol_prd' && (
              <div className="px-4 py-4 text-sm text-gray-500 text-center border-t border-gray-100 mt-2">
                查看方案生成模块的详细功能需求与逻辑定义。
              </div>
            )}

            {currentView === 'dictionary' && (
              <div className="px-4 py-4 text-sm text-gray-500 text-center border-t border-gray-100 mt-2">
                查看所有系统变量与前端映射关系。<br/>
                View all system variables and their UI mappings.
              </div>
            )}
          </>
        ) : (currentView === 'report' || currentView === 'prd' || currentView === 'report_dictionary') ? (
          <>
            <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
              文档结构 Structure
            </div>
            <nav className="px-2 space-y-1">
              <button
                onClick={() => onChangeView('report')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                  currentView === 'report'
                    ? 'bg-white text-blue-700 shadow-sm border border-gray-200 font-semibold'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <span>报告正文 Document</span>
                {currentView === 'report' && <ChevronRight size={14} />}
              </button>
              
              <button
                onClick={() => onChangeView('prd')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                  currentView === 'prd'
                    ? 'bg-white text-blue-700 shadow-sm border border-gray-200 font-semibold'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <span>规格说明书 PRD</span>
                {currentView === 'prd' && <ChevronRight size={14} />}
              </button>

              <button
                onClick={() => onChangeView('report_dictionary')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                  currentView === 'report_dictionary'
                    ? 'bg-white text-blue-700 shadow-sm border border-gray-200 font-semibold'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <span>数据映射字典 Dictionary</span>
                {currentView === 'report_dictionary' && <ChevronRight size={14} />}
              </button>
            </nav>
            
            {currentView === 'report' ? (
              <>
                <div className="px-4 py-2 mt-2 text-xs font-bold text-gray-400 uppercase tracking-wider border-t border-gray-100 pt-3">
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
            ) : currentView === 'report_dictionary' ? (
              <div className="px-4 py-4 mt-4 text-xs text-gray-400 border-t border-gray-100">
                <p>Mapping dictionary for Report variables, data sources, and user inputs.</p>
              </div>
            ) : (
              <div className="px-4 py-4 mt-4 text-xs text-gray-400 border-t border-gray-100">
                <p>Contains validation report content and its corresponding functional requirements.</p>
              </div>
            )}
          </>
        ) : (currentView === 'document' || currentView === 'document_fields') ? (
          <>
            <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
              文档结构 Structure
            </div>
            <nav className="px-2 space-y-1 mb-2">
              <button
                onClick={() => onChangeView('document')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                  currentView === 'document'
                    ? 'bg-white text-blue-700 shadow-sm border border-gray-200 font-semibold'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <span>数据视图 Data View</span>
                {currentView === 'document' && <ChevronRight size={14} />}
              </button>
              
              <button
                onClick={() => onChangeView('document_fields')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                  currentView === 'document_fields'
                    ? 'bg-white text-blue-700 shadow-sm border border-gray-200 font-semibold'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <span>字段表 Field Table</span>
                {currentView === 'document_fields' && <ChevronRight size={14} />}
              </button>
            </nav>

            {currentView === 'document' && (
              <div className="px-4 py-4 text-sm text-gray-500 text-center border-t border-gray-100 mt-2">
                查看并编辑实验数据文档内容。<br/>
                View and edit experimental data content.
              </div>
            )}
            
            {currentView === 'document_fields' && (
              <div className="px-4 py-4 text-sm text-gray-500 text-center border-t border-gray-100 mt-2">
                查看实验数据文档的所有字段定义与结构。<br/>
                View field definitions and schema of the experimental data document.
              </div>
            )}
          </>
        ) : null}
      </div>
      <div className="p-4 border-t border-gray-200 text-xs text-gray-500 bg-white">
        &copy; 2024 ChemExpress
      </div>
    </div>
  );
};
