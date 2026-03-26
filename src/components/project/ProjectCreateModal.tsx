import { useState } from "react";
import Modal from "@/components/ui/Modal";
import type { CreateProjectParams } from "@/types";

interface Props {
  createdUserId: number;
  onClose: () => void;
  onCreate: (params: CreateProjectParams) => Promise<void>;
}

export default function ProjectCreateModal({ createdUserId, onClose, onCreate }: Props) {
  const [name, setName] = useState("");
  const DIMENSIONS = 3072;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { alert("프로젝트 이름을 입력하세요."); return; }
    await onCreate({ name, createdUserId, dimensions: DIMENSIONS });
  };

  return (
    <Modal onClose={onClose}>
      <h2 className="text-xl font-bold text-slate-800 mb-5">프로젝트 생성하기</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">프로젝트 이름</label>
          <input
            type="text"
            placeholder="프로젝트 이름을 입력하세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-slate-800 transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">차원 (고정)</label>
          <input
            value={DIMENSIONS}
            readOnly
            disabled
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed"
          />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition">
            취소
          </button>
          <button type="submit" className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition">
            생성하기
          </button>
        </div>
      </form>
    </Modal>
  );
}