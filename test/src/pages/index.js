import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Box } from '@mui/material'
import CardComponent from '@/components/card'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <>
      <Box sx={{
        height:'100%',
        display:'grid',
        gridTemplateColumns:'1fr 1fr 1fr',
        margin:'30px',
        justifyContent:'center'
      }}>
        <CardComponent props={a}/>
        <CardComponent props={a}/>
        <CardComponent props={b[5]}/>
        <CardComponent props={b[5]}/>
        <CardComponent props={c['c']}/>
        <CardComponent props={c['c']}/>
      </Box>
    </>
  )
}
