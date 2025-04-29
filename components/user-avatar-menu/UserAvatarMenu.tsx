'use client';

import { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Home, LogOut, Settings } from 'lucide-react';
import Link from 'next/link';
import { User } from '@/lib/db/schema';

export type UserAvatarMenuProps = {
  user?: User | null;
  handleSignOut: () => void;
};

const UserAvatarMenu: React.FC<UserAvatarMenuProps> = ({
  user,
  handleSignOut,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DropdownMenuTrigger>
        <Avatar className='size-9 cursor-pointer'>
          <AvatarImage alt={user?.name || ''} />
          <AvatarFallback>
            {user?.email
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='flex flex-col gap-1'>
        <DropdownMenuItem className='cursor-pointer'>
          <Link href='/dashboard' className='flex w-full items-center'>
            <Home className='mr-2 h-4 w-4' />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className='cursor-pointer'>
          <Link href='/settings' className='flex w-full items-center'>
            <Settings className='mr-2 h-4 w-4' />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <form action={handleSignOut} className='w-full'>
          <button type='submit' className='flex w-full'>
            <DropdownMenuItem className='w-full flex-1 cursor-pointer'>
              <LogOut className='mr-2 h-4 w-4' />
              <span>Sign out</span>
            </DropdownMenuItem>
          </button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatarMenu;
