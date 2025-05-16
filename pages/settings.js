import Layout from '@/components/Layout';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function Settings() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <Layout>
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
        <h1 className="text-2xl font-semibold mb-4">Тохиргоо</h1>

        <div className="flex gap-4 mb-4 border-b">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-2 ${activeTab === 'profile' ? 'border-b-2 border-blue-500' : 'text-gray-500'}`}
          >
            Хувийн мэдээлэл
          </button>
          
        </div>

        {activeTab === 'profile' && session && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-4">
              <img
                src={session.user.image}
                alt={session.user.name}
                className="rounded-full h-16 w-16"
              />
              <div>
                <h2 className="text-xl font-bold">{session.user.name}</h2>
                <p className="text-gray-500">{session.user.email}</p>
              </div>
            </div>

            <div className="mt-4 border-t pt-4">
              <h3 className="text-lg font-semibold mb-2">Нэмэлт мэдээлэл:</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>И-мэйл: {session.user.email}</li>
              </ul>
            </div>
          </div>
        )}

        

        {!session && activeTab === 'profile' && (
          <p>Хэрэглэгчийн мэдээлэл олдсонгүй. Та нэвтэрсэн эсэхээ шалгана уу.</p>
        )}
      </div>
    </Layout>
  );
}
