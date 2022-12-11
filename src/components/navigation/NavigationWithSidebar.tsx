import React from 'react';
import {
    Box,
    Checkbox,
    CheckboxGroup,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Grid,
    GridItem,
    IconButton,
    Stack,
    Text,
    useDisclosure
} from '@chakra-ui/react';
import {HiMenu} from "react-icons/hi";
import {IoIosNotifications} from "react-icons/io";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../store/Store";
import {updateFilterValues} from "../store/GenericSlicer";

function NavigationWithSidebar() {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const genres = useSelector((state: RootState) => state.genre.genres);
    const dispatch = useDispatch();
    // Sorting the unique genres (which is to be used as a filter) for better user experience
    const genreAscending = [...genres].sort((a, b) =>
        a > b ? 1 : -1,
    );
    const [checkBoxValue, setCheckBoxValue] = React.useState<(string | number)[]>();

    // Setting the value of the checkboxes and passing it to configure
    // store to use it in the cards filtering logic
    const onChangeCheckBoxHandler = (value: (string | number)[]) => {
        setCheckBoxValue(value);
        dispatch(updateFilterValues(value));
    };

    return (
        <>
            <div className="Header">
                <Grid mt='30' mb='30' h='140px'
                      templateRows='repeat(3, 1fr)'
                      templateColumns='repeat(6, 1fr)'
                      gap={4}
                      bg="blackAlpha.900"
                >
                    <GridItem rowSpan={1} colSpan={1}>
                        <Box p='12' flex={1} borderRadius='md'>
                            <IconButton
                                icon={<HiMenu/>}
                                colorScheme="red"
                                onClick={onOpen}
                                aria-label="icon-button"/>
                        </Box>
                    </GridItem>
                    <GridItem colSpan={4}>
                        <Box p='2' flex={1} borderRadius='md' mt="1px">
                            <Text align="left" color='red' fontFamily="Helvetica"
                                  fontSize={{base: '50px', sm: '24px', md: '40px', lg: '50px'}}>MFlix</Text>
                            <Text align="left" color='white'
                                  fontSize={{base: '20px', sm: '10px', md: '15px', lg: '20px'}}>by Ragul</Text>
                        </Box>
                    </GridItem>
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
                            <CheckboxGroup colorScheme='green' defaultValue={checkBoxValue}
                                           onChange={(value) => onChangeCheckBoxHandler(value)}>
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
        </>
    );
}

export default NavigationWithSidebar;
