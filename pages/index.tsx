import { Container, Text, Group, Paper, Stack, Flex } from "@mantine/core";
import { NextPage } from "next";
import { useContext } from "react";
import { apiCall } from "../components/api";
import { gradientText } from "../components/styles";
import { User } from "./_app";

const Home: NextPage = () => {
  const user = useContext(User)

  return (<Container size="xl" py="xl">
    <Group mb='md' spacing={0}><Group spacing={10}><Text size={35}>Üdvözöllek,</Text><Text size={35} sx={gradientText}>{user.accountName}</Text></Group><Text size={35}>!</Text></Group>
    <Flex align="stretch" justify="space-between" direction='row' wrap="wrap-reverse">
      <Stack mr='md' sx={{ flexBasis: 3, flexGrow: 3, minWidth: '22rem' }}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum numquam nobis vitae soluta, sunt perferendis nemo hic nulla cum at earum eveniet, reiciendis optio reprehenderit vel, necessitatibus porro assumenda tempora.
      </Stack>
      <Paper mb="md" sx={{ minWidth: '22rem', flexBasis: 1, flexGrow: 0 }} withBorder p="xl" shadow="lg">
        <Text size="xl" mb='xs' mt={-20}>Fiókod</Text>
        <Text>Felfüggesztve: nem</Text>
      </Paper>
    </Flex>
  </Container>)
}

export default Home