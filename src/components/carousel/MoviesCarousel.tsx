import * as React from "react";
import {
    Box,
    Center,
    Image,
    Flex,
    Badge,
    Text,
    SimpleGrid,
    useDisclosure,
    Button,
    Divider,
    Card,
    CardBody
} from "@chakra-ui/react";
import {MdStar} from "react-icons/md";
import {movieMocks} from "../MovieMocks";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/core";
import {updateGenre} from "../store/GenericSlicer";
import {useDispatch, useSelector} from "react-redux";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {RootState} from "../store/Store";

function MovieCarousel() {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const uniqueGenres: string[] = [];
    // const allGenres: string[] = [];
    const resultDiv: any = [];
    const filterResultDiv: any = [];
    const dispatch = useDispatch();
    const [title, setTitle] = React.useState("");
    const [rating, setRating] = React.useState<string | undefined>("");
    const [plot, setPlot] = React.useState("");
    const [imgSource, setImgSource] = React.useState("");
    const filterValues = useSelector((state: RootState) => state.filterValues.filterValues);

    // const imageOnErrorHandler = (
    //     event: React.SyntheticEvent<HTMLImageElement, Event>
    // ) => {
    //     event.currentTarget.onerror = null;
    //     event.currentTarget.src = "https://www.kindacode.com/wp-content/uploads/2021/08/oops.png";
    // };

    const viewDetails = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        onOpen();
        const id = event.currentTarget.id;
        console.log("button clicked with id...", id);
        movieMocks.forEach(movie => {
            if (movie._id === id) {
                setTitle(movie.title);
                if(movie.rated === undefined || null) {
                    setRating("N/A");
                }
                else {
                    setRating(movie.rated);
                }
                setPlot(movie.plot);
                setImgSource(movie.poster);
            }
        })
    }

    console.log("filter values inside movies...", filterValues);
    function updateResult(movie: any, genresAdded: string, result: any) {
        console.log("resultdiv in update result function is...", result);
        result.push(
            // <Card maxW='sm'>
            //     <CardBody>
            <Box p="5" maxW="300px" borderWidth="1px">
                <Image borderRadius="md" alt={movie.title}
                       src={movie.poster} />
                {/*onError={imageOnErrorHandler} />*/}
                <Flex align="baseline" mt={2} justifyContent='center'>
                </Flex>
                <Text mt={2} fontSize="l" fontWeight="bold" lineHeight="short">
                    {genresAdded.slice(0, -2)}
                </Text>
                <Text
                    mt={2}
                    fontSize="sm"
                    fontWeight="semibold"
                    color="pink.800"
                >
                    {movie.languages}
                </Text>
                <Flex mt={2} >
                    <Box as={MdStar} color="orange.400"/>
                    <Text ml={1} fontSize="sm">
                        <b>{movie.imdb.rating}/10</b>
                    </Text>
                </Flex>
                <Button id={movie._id} mt={4} onClick={(event) => viewDetails(event)}>
                    View Details
                </Button>
            </Box>
            // </CardBody><Divider /></Card>
        )
    }

    movieMocks.forEach(movie => {
        let genresAdded: string = "";
        movie.genres.forEach(genre => {
            genresAdded += genre + " | ";
            // allGenres.push(genre);
            if (!uniqueGenres.includes(genre)) {
                uniqueGenres.push(genre);
            }
        })
        updateResult(movie, genresAdded, resultDiv);
    });
    dispatch(updateGenre(uniqueGenres));

    movieMocks.forEach(movie => {
        let genresAdded: string = "";
        console.log("genre type...", filterValues +"...." + filterValues.length);
        if(filterValues.length > 0) {
            filterValues.forEach(filter => {
                let filterString: string = ""+filter;
                if(Object.values(movie.genres).indexOf(filterString) > -1) {
                    console.log("genre type... has...", filterString.toUpperCase());
                    movie.genres.forEach(genre => {
                        genresAdded += genre + " | ";
                    })
                    updateResult(movie, genresAdded, filterResultDiv);
                }
            })
        }
        console.log("filterResultDiv....is....", filterResultDiv);
        console.log("filterResultDi length is....", filterResultDiv.length);
    });

    console.log("resultDiv length is....", resultDiv.length);
    console.log("filterResultDiv length is....", filterResultDiv.length);

    return (
        <>
            <div className="MovieCarousel">
                {(() => {
                    if (filterValues.length > 0) {
                        return (
                        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                            {filterResultDiv}
                        </SimpleGrid>

                        )
                    } else {
                        return (
                            <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                                {resultDiv}
                            </SimpleGrid>
                        )
                    }
                })()}
            </div>
            <div className='Movie Modal'>
                <Modal size={'sm'} isOpen={isOpen} onClose={onClose} blockScrollOnMount={false}>
                    <ModalOverlay/>
                    <ModalContent>
                        <ModalCloseButton/>
                        <ModalBody>
                            <Box p="9" borderWidth="1px" bg="whiteAlpha.900">
                                <Flex mt={2} align="center" justifyContent='center'>
                                    <Image borderRadius="md" height='300px' width='200px' src={imgSource} alt={title} />
                                            {/*onError={imageOnErrorHandler} />*/}
                                </Flex>
                                <Flex align="center" mt={2} justifyContent='center'>
                                    <Text mt={2} fontSize="l" color='black' fontWeight="bold" lineHeight="short">
                                        <b>Movie Title: </b>{title}
                                    </Text>
                                </Flex>
                                <Flex align="center" mt={2} justifyContent='center'>
                                    <Text mt={2} fontSize="l" color="black" lineHeight="short">
                                        <b>Movie Rating: </b> {rating}
                                    </Text>
                                </Flex>
                                <Flex mt={2} align="center" justifyContent='center'>
                                    <Text mt={2} fontSize="l" color="black" lineHeight="short">
                                        <b>Story plot: </b>{plot}
                                    </Text>
                                </Flex>
                                <Flex mt={5} align="center" justifyContent='center'>
                                    <Button colorScheme='red' onClick={onClose}>Close</Button>
                                </Flex>
                            </Box>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </div>
        </>
    );
}

export default MovieCarousel;