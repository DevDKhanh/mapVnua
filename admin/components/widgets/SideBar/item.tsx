import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button, ListItem } from '@mui/material';
import { Fragment, useCallback, useMemo } from 'react';
import clsx from 'clsx';

export const NavItem = (props: any) => {
    const { href, icon, title, tabList, ...others } = props;
    const router = useRouter();
    const active = useMemo(
        () =>
            href ? router.pathname.split('/')[1] === href.split('/')[1] : false,
        [href, router]
    );

    const activeTab = useCallback(
        (href) => {
            return router.pathname.includes(href);
        },
        [router]
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
                <div className={'main-tab'}>
                    <Button
                        component="a"
                        startIcon={icon}
                        disableRipple
                        className={clsx({ 'active-btn_': active })}
                    >
                        <Box sx={{ flexGrow: 1, color: '#0060ff' }}>
                            {title}
                        </Box>
                    </Button>
                    {active && tabList.length > 0 && props && (
                        <div className={clsx('list-tab')}>
                            {tabList.map((tab: any) => (
                                <NextLink href={tab.href} key={tab.id}>
                                    <a
                                        className={clsx({
                                            ['active-tab']: activeTab(tab.href),
                                        })}
                                    >
                                        {tab.txt}
                                    </a>
                                </NextLink>
                            ))}
                        </div>
                    )}
                </div>
            </NextLink>
        </ListItem>
    );
};

NavItem.propTypes = {
    href: PropTypes.string,
    icon: PropTypes.node,
    title: PropTypes.string,
    tabList: PropTypes.array,
};
