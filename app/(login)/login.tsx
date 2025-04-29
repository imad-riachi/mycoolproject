'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  CircleIcon,
  Loader2,
  MailIcon,
  KeyIcon,
  ChevronLeft,
} from 'lucide-react';
import { signIn, signUp } from './actions';
import { ActionState } from '@/lib/auth/middleware';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import ThemeToggle from '@/components/theme-toggle';

export function Login({ mode = 'signin' }: { mode?: 'signin' | 'signup' }) {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  const priceId = searchParams.get('priceId');
  const inviteId = searchParams.get('inviteId');
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    mode === 'signin' ? signIn : signUp,
    { error: '' },
  );

  return (
    <div className='bg-muted/40 flex min-h-[100dvh] flex-col justify-center px-4 py-12 sm:px-6 lg:px-8'>
      <div className='absolute top-4 left-4 flex items-center gap-2 sm:top-8 sm:left-8'>
        <Link
          href='/'
          className={cn(
            buttonVariants({ variant: 'ghost', size: 'default' }),
            'gap-1.5 pl-2.5 font-medium',
          )}
        >
          <ChevronLeft className='h-5 w-5' />
          Back
        </Link>
      </div>

      <div className='absolute top-4 right-4 sm:top-8 sm:right-8'>
        <ThemeToggle />
      </div>

      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='flex justify-center'>
          <div className='bg-primary/10 flex h-14 w-14 items-center justify-center rounded-full'>
            <CircleIcon className='text-primary h-8 w-8' />
          </div>
        </div>
        <h2 className='text-foreground mt-5 text-center text-3xl font-bold tracking-tight'>
          {mode === 'signin'
            ? 'Sign in to your account'
            : 'Create your account'}
        </h2>
        <p className='text-muted-foreground mt-2 text-center text-sm'>
          {mode === 'signin'
            ? 'Welcome back! Enter your credentials below'
            : 'Fill in your details to get started'}
        </p>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <Card className='border-border/40 shadow-lg'>
          <CardHeader className='pb-4'>
            <CardTitle className='text-center text-xl'>
              {mode === 'signin' ? 'Sign In' : 'Sign Up'}
            </CardTitle>
            <CardDescription className='text-center'>
              {mode === 'signin'
                ? 'Enter your email and password'
                : 'Create a new account'}
            </CardDescription>
          </CardHeader>
          <CardContent className='pt-2 pb-6'>
            <form className='space-y-5' action={formAction}>
              <input type='hidden' name='redirect' value={redirect || ''} />
              <input type='hidden' name='priceId' value={priceId || ''} />
              <input type='hidden' name='inviteId' value={inviteId || ''} />

              <div className='space-y-2'>
                <Label htmlFor='email' className='text-sm font-medium'>
                  Email
                </Label>
                <div className='relative'>
                  <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                    <MailIcon className='text-muted-foreground h-4 w-4' />
                  </div>
                  <Input
                    id='email'
                    name='email'
                    type='email'
                    autoComplete='email'
                    defaultValue={state.email}
                    required
                    maxLength={50}
                    placeholder='Enter your email'
                    className='pl-10'
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='password' className='text-sm font-medium'>
                  Password
                </Label>
                <div className='relative'>
                  <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                    <KeyIcon className='text-muted-foreground h-4 w-4' />
                  </div>
                  <Input
                    id='password'
                    name='password'
                    type='password'
                    autoComplete={
                      mode === 'signin' ? 'current-password' : 'new-password'
                    }
                    defaultValue={state.password}
                    required
                    minLength={8}
                    maxLength={100}
                    placeholder='Enter your password'
                    className='pl-10'
                  />
                </div>
              </div>

              {state?.error && (
                <div className='text-destructive bg-destructive/10 border-destructive/20 rounded-md border px-3 py-2 text-sm font-medium'>
                  {state.error}
                </div>
              )}

              <Button
                type='submit'
                className='mt-2 h-10 w-full font-medium'
                disabled={pending}
              >
                {pending ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Loading...
                  </>
                ) : mode === 'signin' ? (
                  'Sign in'
                ) : (
                  'Sign up'
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className='flex flex-col pt-0 pb-6'>
            <div className='relative my-4 w-full'>
              <div className='absolute inset-0 flex items-center'>
                <div className='border-border/60 w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs'>
                <span className='bg-card text-muted-foreground px-2'>
                  {mode === 'signin'
                    ? 'New to our platform?'
                    : 'Already have an account?'}
                </span>
              </div>
            </div>

            <Link
              href={`${mode === 'signin' ? '/sign-up' : '/sign-in'}${redirect ? `?redirect=${redirect}` : ''}${priceId ? `&priceId=${priceId}` : ''}`}
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg' }),
                'hover:bg-muted w-full font-medium transition-all',
              )}
            >
              {mode === 'signin'
                ? 'Create an account'
                : 'Sign in to existing account'}
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
