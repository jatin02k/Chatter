import React from 'react'
import { chatStore } from '../store/chatStore'
import ChatContainer from '../components/ChatContainer'
import NoChatSelected from '../components/NoChatSelected'
import Sidebar from '../components/Sidebar'

export const Home = () => {
  const {selectedUser} = chatStore();
  return (
    <div className='min-h-screen bg-base-200'>
      <div className='flex items-center justify-center pt-20 px-4'>
        <div className='bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]"'>
          <div className="flex h-115 rounded-lg overflow-hidden">

            <Sidebar/>

            {!selectedUser ? <NoChatSelected/> : <ChatContainer/>}

          </div>
        </div>
      </div>
    </div>
  )
}
