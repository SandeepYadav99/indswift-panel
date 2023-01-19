
export default (theme) => ({
        btnSuccess: {
            backgroundColor: '#EDFBF6',
            color: '#2DCFC2',
            marginRight: 5,
            marginLeft: 5,
            transition: 'all 0.5s',
            boxShadow: 'none',
            '&:hover': {
                backgroundColor: theme.palette.success.main,
                color: 'white'
            }
        },
        btnError: {
            backgroundColor: '#FFF0F1',
            color: '#FD6D63',
            marginLeft: 25,
            marginRight: 5,
            boxShadow: 'none',
            '&:hover': {
                backgroundColor: theme.palette.error.main,
                color: 'white'
            }
        },
    btnWarning: {
        backgroundColor: '#FFF5EB',
        color: '#FA8B37',
        marginLeft: 5,
        marginRight: 5,
        boxShadow: 'none',
        '&:hover': {
            backgroundColor: theme.palette.error.main,
            color: 'white'
        }
    },
    primaryBadge: {
            backgroundColor: theme.palette.primary.main,
        display: 'inline-block',
        color: 'white',
        padding: '2px 12px',
        borderRadius: '20px',
        fontSize: '0.7rem',
        fontWeight: 'bold'
    },
    iconBtnError: {
        color: theme.palette.error.dark
    },
    btnAction: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#2896e9',
            padding: '5px 15px',
            textTransform: 'uppercase',
            background: '#ffffff',
            borderRadius: '15px',
            minWidth:'30px !important',
            '&:hover': {
                color: 'white',
                '& span':{
                    color:'white'
                }
            },
            '&@media(max-width: 1520px)': {
                padding:'5px'
            }

    }
});
