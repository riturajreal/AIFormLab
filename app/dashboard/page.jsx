import React from 'react';
import SideNav from './_components/SideNav';
import { Button } from '../../components/ui/button';
import CreateForm from './_components/CreateForm';



export default function DashboardPage() {
  return (
    <main className="flex-1 ml-64 w-[calc(100%-16rem)] p-20">
      <div className='w-full'>
        <h2 className='font-bold text-3xl flex items-center justify-between text-white'>Dashboard
          <CreateForm />
        </h2>
        

      </div>
    </main>
  );
}