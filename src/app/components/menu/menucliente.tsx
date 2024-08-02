'use client'
import { useState, Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { Logout } from '@/api/logout/logout'

type MenuClienteProps = {
  nameuser: string
}

const navigation = [
  { name: 'Início', href: '/cliente', current: true },
  { name: 'Agenda', href: '/agendacliente', current: false },
  { name: 'Histórico', href: '/historicocliente', current: false },
  { name: 'Configuração', href: '#', current: false },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function MenuCliente({ nameuser }: MenuClienteProps) {
  const [isOpen, setIsOpen] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const toggleMenu = (): void => {
    setIsOpen(!isOpen)
  }

  const logout = () => {
    Logout()
  }

  return (
    <Disclosure as="nav" className="bg-black fixed w-full z-50 h-16">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-yellow-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Abrir Menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link href={'/home'}>
                    <Image
                      className="h-14 w-auto"
                      src="/Coliseum Sport Arena_LM12.png"
                      alt="Your Company"
                      width={500}
                      height={500}
                      quality={100}
                    />
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4 mt-3 font-alt">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-yellow-500 text-black shadow-2xl'
                            : 'transition  text-white hover:bg-yellow-500 hover:text-black hover:duration-500 ',
                          'rounded-md px-3 py-2 text-sm font-medium',
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <span className="hidden md:block md:text-white font-alt">
                  Bem vindo {nameuser}!
                </span>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Abrir Menu</span>
                      <Image
                        className="h-13 w-13 rounded-full p-2"
                        src="/login.png"
                        alt=""
                        width={50}
                        height={50}
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute font-sans right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/login"
                            onClick={logout}
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-black',
                            )}
                          >
                            Sair
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 font-alt bg-zinc-700">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-yellow-500 text-white'
                      : 'text-white hover:bg-black',
                    'block rounded-md px-3 py-2 text-base font-medium',
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
