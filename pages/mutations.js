/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Text, Box, FormLabel, FormControl, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import { addSuperHeroes, getSuperHeroes } from "../customHooks/useSuperHeroes";

export default function mutations() {
  const [superheroName, setSuperheroName] = useState('');
  const [alterEgoName, setAlterEgoName] = useState('');
  
  const result = getSuperHeroes();

  const mutateResult = addSuperHeroes();

  const submitHandler = () => {
      const hero = {name: superheroName, alterEgo: alterEgoName};
      mutateResult.mutate(hero);
      setSuperheroName('');
      setAlterEgoName('');
  }

  return (
    <div>
      <Text fontSize='3xl' fontWeight='600'> Mutations </Text>
      
      <Box sx={{border: '2px solid grey', padding:'20px', margin:'15px', borderRadius:'15px'}}>
        <Text fontSize='2xl' textDecoration='underline'>Superheroes list</Text>  
        <div>
          {result.data?.map(item => {
            return (<p key={item.id}>{item.id}. {item.name}</p>)
          })}
        </div>
        <Button 
          m={2} 
          onClick={result.refetch} 
          isLoading={result.isLoading || result.isFetching}
        >Fetch Heroes</Button>
      </Box>
      <Box sx={{border: '2px solid grey', padding:'20px', margin:'15px', borderRadius:'15px'}}>
        <Text fontSize='2xl' textDecoration='underline'>Add Superheroes to the list</Text>  
        <form>
          <FormControl m={2}>
              <FormLabel htmlFor='superhero' id='superhero-label'>Superhero Name </FormLabel> 
              <Input 
                id='superhero'
                name='superhero' 
                type='text' 
                value={superheroName} 
                onChange={(e) => setSuperheroName(e.target.value)}
              ></Input>
          </FormControl>
          <FormControl m={2}>
              <FormLabel htmlFor='alterEgo' id='alterEgo-label'>AlterEgo Name </FormLabel> 
              <Input 
                name='alterEgo' 
                type='text' 
                value={alterEgoName} 
                onChange={(e) => setAlterEgoName(e.target.value)}
                id='alterEgoName'
              ></Input>
          </FormControl>
          <Button 
            m={2} 
            onClick={submitHandler}
            isLoading={mutateResult.isLoading}
          >{(mutateResult.isIdle && "submit") || (mutateResult.isSuccess && "Done") || (mutateResult.isError && "Try Again")}
          </Button>
        </form>
      </Box>
      
    </div>
  )
}
