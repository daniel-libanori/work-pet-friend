import React, { useEffect, useState } from "react";
import HeaderFrame from "@/components/headerFrame/headerFrame";
import { useSystemState } from "@/context/systemStateContext";
import { useNavigate } from "react-router";
import Modal from "@/components/update/Modal";

interface NoteMeta {
  title: string;
  mtime: number;
}

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<NoteMeta[]>([]);
  const [currentTitle, setCurrentTitle] = useState("");
  const [content, setContent] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toggleSize } = useSystemState();

  useEffect(() => {
    toggleSize(720, 720);
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const list = await window.ipcRenderer.invoke("notes-list");
    setNotes(list);
    if (list.length > 0) {
      openNote(list[0].title);
    }
  };

  const openNote = async (title: string) => {
    const text = await window.ipcRenderer.invoke("notes-read", title);
    setCurrentTitle(title);
    setContent(text);
  };

  const handleSave = async () => {
    if (!currentTitle.trim()) return;
    await window.ipcRenderer.invoke("notes-save", currentTitle, content);
    fetchNotes();
  };

  const handleAdd = () => {
    setCurrentTitle("New Note");
    setContent("");
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await window.ipcRenderer.invoke("notes-delete", deleteTarget);
    setDeleteTarget(null);
    if (currentTitle === deleteTarget) {
      setCurrentTitle("");
      setContent("");
    }
    fetchNotes();
  };

  const handleBack = () => {
    navigate("/home");
  };

  return (
    <div className="bg-[#c78f40] overflow-hidden h-full">
      <HeaderFrame />
      <div className="flex flex-col h-full pt-10 px-4 pb-4">
        <button
          onClick={handleBack}
          className="bg-transparent font-sans cursor-pointer font-bold text-xl mt-6 absolute top-4 left-4"
        >
          Back
        </button>
        <div className="flex flex-1 mt-8 overflow-hidden">
          <div className="w-56 flex flex-col mr-4">
            <button
              onClick={handleAdd}
              className="mb-2 bg-[#c08440] hover:bg-[#d69851] text-[#4d330e] border-2 border-[#633000] rounded-md p-1 font-bold"
            >
              New Note
            </button>
            <div className="flex-1 overflow-auto border-2 border-[#633000] rounded">
              {notes.map((n) => (
                <div
                  key={n.title}
                  className="flex items-center justify-between px-2 py-1 border-b border-[#633000] cursor-pointer"
                  onClick={() => openNote(n.title)}
                >
                  <span>{n.title}</span>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteTarget(n.title);
                    }}
                    className="text-red-600 ml-2"
                  >
                    x
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 flex flex-col">
            <input
              value={currentTitle}
              onChange={(e) => setCurrentTitle(e.target.value)}
              className="border-[#633000] border-2 rounded mb-2 p-1 font-bold"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="flex-1 border-[#633000] border-2 rounded p-1 resize-none font-mono"
            />
            <button
              onClick={handleSave}
              className="mt-2 bg-[#c08440] hover:bg-[#d69851] text-[#4d330e] border-2 border-[#633000] rounded-md p-1 font-bold"
            >
              Save
            </button>
          </div>
        </div>
      </div>
      <Modal
        open={!!deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onOk={handleDelete}
        okText="Delete"
        cancelText="Cancel"
        title="Delete note?"
      >
        <p>Are you sure you want to delete this note?</p>
      </Modal>
    </div>
  );
};

export default Notes;

