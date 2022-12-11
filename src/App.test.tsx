import React from 'react';
import {render} from '@testing-library/react';
import App from './App';


// Default test added by react
test('renders learn react link', () => {
    render(<App/>);
    // const linkElement = screen.getByText(/learn react/i);
    // expect(linkElement).toBeInTheDocument();
    // expect(linkElement.closest('a')).toHaveAttribute("href", "https://reactjs.org");
});
