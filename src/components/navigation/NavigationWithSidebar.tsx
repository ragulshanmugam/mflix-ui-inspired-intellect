import React from 'react';
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Input,
    IconButton, Box, Text, Grid, GridItem,
    Checkbox, CheckboxGroup, Stack, Flex, Button
} from '@chakra-ui/react';
import {HiMenu} from "react-icons/hi";
import {IoIosNotifications} from "react-icons/io";
import {useSelector} from "react-redux";
import type {RootState} from "../store/Store";
import {useDispatch} from "react-redux";
import {updateFilterValues, updateGenre} from "../store/GenericSlicer";

function NavigationWithSidebar() {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const genres = useSelector((state: RootState) => state.genre.genres);
    const dispatch = useDispatch();
    const genreAscending = [...genres].sort((a, b) =>
        a > b ? 1 : -1,
    );
    const [checkBoxValue, setCheckBoxValue] = React.useState<(string | number)[]>();

    // genreAscending.forEach(genre => {
    //     checkBoxDiv.push(
    //         <Checkbox value={genre}>{genre}</Checkbox>
    //     )
    // });
    const onChangeCheckBoxHandler = (value: (string | number)[]) => {
        // console.log(value);
        setCheckBoxValue(value);
        dispatch(updateFilterValues(value));
    };

    const checkboxes = React.useRef();

    // function unCheckAll() {
    //     for(const checkbox of checkboxes.current) {
    //         checkbox.checked = false;
    //     }
    // }

    return (
        <>
            {/*<div className="SideNavBarWithHeader" style={{ position: 'fixed' }}>*/}
            <div className="Header">
                {/*<Flex>*/}
                <Grid mt='30' ml='30' mr='30' mb='30' h='140px'
                    templateRows='repeat(3, 1fr)'
                    templateColumns='repeat(6, 1fr)'
                    gap={4}
                    bg="blackAlpha.900"
                      // position="absolute"
                >
                    <GridItem rowSpan={1} colSpan={1} >
                        <Box p='12' flex={1} borderRadius='md'>
                            <IconButton
                                icon={<HiMenu/>}
                                colorScheme="red"
                                onClick={onOpen}
                                aria-label="icon-button"/>
                        </Box>
                    </GridItem>
                    <GridItem colSpan={4} >
                        <Box p='2' flex={1} borderRadius='md' mt="1px">
                            <Text align="left" color='red' fontFamily="Helvetica" fontSize={{ base: '50px', sm:'24px', md: '40px', lg: '50px' }}>MFlix</Text>
                            <Text align="left" color='white' fontSize={{ base: '20px', sm:'10px', md: '15px', lg: '20px' }}>by Ragul</Text>
                        </Box>
                    </GridItem>
                    {/*<GridItem colSpan={2}/>*/}
                    <GridItem rowSpan={1} colSpan={1}>
                        <Box p='12' flex={1} borderRadius='md'>
                            <IconButton
                                icon={<IoIosNotifications alignmentBaseline="auto"/>}
                                colorScheme="red"
                                float="right"
                                aria-label="notification-button"/>
                        </Box>
                    </GridItem>
                </Grid>
            </div>
            <div className="SideBar">
                <Drawer
                    isOpen={isOpen}
                    placement='left'
                    onClose={onClose}
                >
                    <DrawerOverlay/>
                    <DrawerContent>
                        <DrawerCloseButton/>
                        <DrawerHeader>Filter by Genres</DrawerHeader>
                        <DrawerBody mt='10px'>
                            <CheckboxGroup colorScheme='green' defaultValue={checkBoxValue} onChange={(value) => onChangeCheckBoxHandler(value)}>
                                <Stack spacing={[1]} direction={['column']}>
                                    {genreAscending.map((genre) => {
                                    return (
                                        <Checkbox key={genre} value={genre}>{genre}</Checkbox>
                                        );
                                    })}
                                    {/*<Button onClick={unCheckAll}>Clear All</Button>*/}
                                    {/*{checkBoxDiv}*/}
                                </Stack>
                            </CheckboxGroup>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </div>
            {/*</div>*/}

        </>
    );
}

export default NavigationWithSidebar;