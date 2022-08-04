import {React, useEffect,useState } from 'react';
import axios from 'axios';
import { Divider,Container,FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,  
    Heading,Text, Table,TableContainer,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,} from '@chakra-ui/react'
const Data = () => {
    const [name,setName] = useState([]);
    const [email,setEmail] = useState([]);
    const [tagihan,setTagihan] = useState([]);
    const [date,setDate] = useState([]);
    const [dateExpired,setDateExpired] = useState([]);
    const [bank,setBank]    = useState([]);
    const [jenisBank,setJenisBank] = useState([]);
    const fetchData = async()=>{
        try{
            const res = await axios.get(`https://api.dev.sekolah.mu/se-test/invoice`,{
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "secret_auth_token!!$$"
                }
            });
            // setResult(res.data);

            console.log(res.data.data.data)
            setTagihan(res.data.data.data.full_id);
            setName(res.data.data.data.name)
            setDate((res.data.data.data.created_at).substring(0,20))
            setDateExpired((res.data.data.data.expired_at).substring(0,20))
            setBank(res.data.data.data.payment_channel)
            setJenisBank(res.data.data.data.payment_channel_detail)

            // console.log(result)
        }
        catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
        fetchData()
    }, []);
    return (
        <div>
            <Container >
            <Heading mt={5} size={'lg'}>SEKOLAH.MU</Heading>
            <FormControl mt={10}>
            <Heading size={'sm'}>Detail Tagihan</Heading>
            <Divider mb={2} mt={2} />
            <FormHelperText htmlFor="tagihan">No Tagihan :  </FormHelperText><Text>{tagihan}</Text>
            <FormHelperText htmlFor="name">Nama Pengguna :  </FormHelperText><p>{name}</p>
            <FormHelperText htmlFor="tanggal">Tanggal Pembelian :  </FormHelperText><p>{date}</p>
            </FormControl>

            <Divider mt={2} mb={12} />
            <Heading size={'sm'}>Pembayaran Berhasil </Heading>
            <Divider mb={2} mt={2} />

            <FormControl>
            <FormHelperText htmlFor="tanggalbayar">Tanggal Pembayaran :  </FormHelperText> <p>{dateExpired}</p>
            </FormControl>
            
            <TableContainer>
                <Table variant='simple' mt={2} size="xl">
                    <Thead bgColor={'grey'}>
                    <Tr>
                        <Th>Metode Pembayaran</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    <Tr>
                        <Td>
                            <FormControl> 
                            <FormHelperText htmlFor="transfer">{bank}  </FormHelperText> <p>{jenisBank}</p>
                            </FormControl>
                        </Td>

                    </Tr>
                    </Tbody>
            </Table>
      </TableContainer>
      
            </Container>
        </div>
    );
}

export default Data;
