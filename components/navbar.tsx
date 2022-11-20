import { useState } from 'react';
import { createStyles, Navbar, Group, Code, Title, Burger } from '@mantine/core';
import {
    IconHome,
    IconLogout,
    IconUser
} from '@tabler/icons';
import { useCookies } from "react-cookie"
import Link from 'next/link';
import { useRouter } from 'next/router';
import { gradientText } from './styles';

const useStyles = createStyles((theme, _params, getRef) => {
    const icon: any = getRef('icon');
    return {
        header: {
            paddingBottom: theme.spacing.md,
            marginBottom: theme.spacing.md * 1.5,
            borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
                }`,
        },

        footer: {
            paddingTop: theme.spacing.md,
            marginTop: theme.spacing.md,
            borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
                }`,
        },

        link: {
            ...theme.fn.focusStyles(),
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            fontSize: theme.fontSizes.sm,
            color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
            padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
            borderRadius: theme.radius.sm,
            fontWeight: 500,

            '&:hover': {
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                color: theme.colorScheme === 'dark' ? theme.white : theme.black,

                [`& .${icon}`]: {
                    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
                },
            },
        },

        linkIcon: {
            ref: icon,
            color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
            marginRight: theme.spacing.sm,
        },

        linkActive: {
            '&, &:hover': {
                backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
                    .background,
                color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
                [`& .${icon}`]: {
                    color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
                },
            },
        },
    };
});

const data = [
    { link: '/', label: 'Főoldal', icon: IconHome },
    { link: '/karakter', label: 'Karakter', icon: IconUser }
];

export const NavbarSimple = () => {
    const { classes, cx } = useStyles();
    const [cookies, setCookie, removeCookie] = useCookies(["user-auth"])
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const links = data.map((item) => (
        <Link
            className={cx(classes.link, { [classes.linkActive]: item.link === router.pathname })}
            href={item.link}
            key={item.label}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </Link>
    ));

    return (<>
        <Group p="sm" sx={(theme) => ({
            position: 'fixed', top: 0, left: 0, zIndex: 999, display: 'none',
            [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
                display: 'initial'
            },
        })}>
            <Burger opened={open} onClick={() => { setOpen(!open) }} />
        </Group>
        <Navbar width={{ sm: 300 }} sx={(theme) => ({
            [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
                display: !open ? 'none' : 'initial'
            },
        })} p="md">
            <Navbar.Section grow sx={(theme) => ({
                [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
                    marginTop: theme.spacing.xl
                },
            })}>
                <Group spacing={6} className={classes.header} position="apart">
                    <Title sx={gradientText} order={1}>StayMTA</Title>
                    <Code sx={{ fontWeight: 700 }}>Bejelentkezve mint: {cookies["user-auth"].accountName}</Code>
                </Group>
                {links}
            </Navbar.Section>

            <Navbar.Section className={classes.footer}>
                <a href="#" className={classes.link} onClick={(event) => {
                    event.preventDefault()
                    removeCookie("user-auth", { path: '/' })
                }}>
                    <IconLogout className={classes.linkIcon} stroke={1.5} />
                    <span>Kijelentkezés</span>
                </a>
            </Navbar.Section>
        </Navbar>
    </>
    );
}