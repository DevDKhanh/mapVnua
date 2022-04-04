import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button, ListItem } from '@mui/material';
import { useMemo } from 'react';

export const NavItem = (props: any) => {
    const { href, icon, title, ...others } = props;
    const router = useRouter();
    const active = useMemo(
        () =>
            href ? router.pathname.split('/')[1] === href.split('/')[1] : false,
        [href, router]
    );

    return (
        <ListItem
            disableGutters
            sx={{
                display: 'flex',
                mb: 0.5,
                py: 0,
                px: 2,
            }}
            {...others}
        >
            <NextLink href={href} passHref>
                <Button
                    component="a"
                    startIcon={icon}
                    disableRipple
                    sx={{
                        borderLeft: active && '5px solid #5047e5',
                        marginInlineStart: active && '-5px',
                        borderTopLeftRadius: active && 0,
                        borderBottomLeftRadius: active && 0,
                    }}
                >
                    <Box sx={{ flexGrow: 1 }}>{title}</Box>
                </Button>
            </NextLink>
        </ListItem>
    );
};

NavItem.propTypes = {
    href: PropTypes.string,
    icon: PropTypes.node,
    title: PropTypes.string,
};
