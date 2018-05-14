export default {
    // Some global styles
    '@global': {
        html: {
            fontSize: '16px',
            boxSizing: 'border-box',
        },

        '*, *:before, *:after': {
            boxSizing: 'inherit',
        },

        body: {
            backgroundColor: '#ddd',
            color: '#333',
            fontFamily: 'Sans-serif',
            fontWeight: 'normal',
            fontSize: '1rem',
            lineHeight: '1.5',
        },

        h1: {
            margin: ['2rem', 0, '1rem'],
        },

        header: {
            marginBottom: '2rem',
        },

        a: {
            color: '#568db2',
        },

        'a:hover': {
            color: '#466d87',
        },
    },

    appWrapper: {
        textAlign: 'center',
    },

    textModal: {
        textAlign: 'left',
        margin: '0.8rem',
        padding: '0.8rem',
        background: '#ccc',

        '& h2': {
            marginTop: 0,
        },

        '& p': {
            marginBottom: 0,
        },
    },

    imageModal: {
        padding: '0.4rem',

        '& img': {
            display: 'block',
            maxWidth: '100%',
            height: 'auto',
        },
    },
};
