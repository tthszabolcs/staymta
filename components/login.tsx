import { Button, Container, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core"
import { useForm } from "@mantine/form";
import { IconUser, IconKey, IconLogin } from "@tabler/icons"
import { apiCall } from "./api";
import { useCookies } from "react-cookie"
import { gradientText } from "./styles";

export const LoginPage = ({ authCookie, ...pageProps }: { authCookie: string }) => {
    const [cookies, setCookie, removeCookie] = useCookies(["user-auth"])
    const form = useForm({
        initialValues: {
            username: '',
            password: '',
        },
    });

    return (
        <Container style={{ height: '100vh' }}>
            <form onSubmit={form.onSubmit((values) => {
                apiCall("POST", "api/user/authenticate", values).then((jwt) => {
                    setCookie("user-auth", jwt, { path: '/', maxAge: 60 * 60 })
                })
            })} style={{ width: '100%', height: '100%' }}>
                <Stack spacing="sm" style={{ width: '100%', height: '100%' }} justify="center" align="stretch">
                    <Stack spacing={2}>
                        <Title align="center" sx={gradientText} >StayMTA UCP</Title>
                        <Text align="center">Kérlek jelentkezz be!</Text>
                    </Stack>
                    <TextInput {...form.getInputProps("username")} required label="Felhasználónév" icon={<IconUser />} />
                    <PasswordInput {...form.getInputProps("password")} required label="Jelszó" icon={<IconKey />} />
                    <Button variant="gradient" gradient={{ from: 'staymta', to: 'red' }} type="submit" leftIcon={<IconLogin />}>Bejelentkezés</Button>
                </Stack>
            </form>
        </Container >)
}