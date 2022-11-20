import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ColorScheme, ColorSchemeProvider, MantineProvider, AppShell, MediaQuery, Space } from '@mantine/core'
import { useHotkeys } from '@mantine/hooks';
import { useCookies } from 'react-cookie';
import { LoginPage } from '../components/login';
import { NavbarSimple } from '../components/navbar';
import { createContext } from 'react';

export const User = createContext<any>(undefined)

export default function App({ Component, pageProps }: AppProps) {
  const [cookies, setCookie, removeCookie] = useCookies(["user-auth", "color-scheme"])
  const setColorScheme = (val: ColorScheme) => setCookie("color-scheme", val, { path: '/', maxAge: 60 * 60 });
  const colorScheme = cookies["color-scheme"] || 'dark'
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([
    ['ctrl+J', () => toggleColorScheme()]
  ])

  pageProps = {
    ...pageProps,
    authCookie: cookies["user-auth"]
  }

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider withGlobalStyles withNormalizeCSS inherit theme={{
        colorScheme: colorScheme,
        colors: {
          'staymta': ['#fff5e6', '#ffeacc', '#ffe0b3', '#ffd699', '#ffcc80', '#ffc166', '#ffb74d', '#ffad33', '#ffa21a', '#ff9800'],
        },
        primaryColor: 'staymta',
      }}>
        <User.Provider value={cookies["user-auth"]}>
          {!cookies["user-auth"] ? <LoginPage {...pageProps} /> :
            <AppShell navbar={<NavbarSimple />}>
              <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
                <Space h="md" />
              </MediaQuery>
              <Component {...pageProps} />
            </AppShell>
          }
        </User.Provider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}
