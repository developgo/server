import IconButton from '@material-ui/core/IconButton';
import {StyleRules, withStyles, WithStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Delete from '@material-ui/icons/Delete';
import React from 'react';
import TimeAgo from 'react-timeago';
import Container from '../common/Container';

const styles = (): StyleRules => ({
    header: {
        display: 'flex',
    },
    headerTitle: {
        flex: 1,
    },
    trash: {
        marginTop: -15,
        marginRight: -15,
    },
    wrapperPadding: {
        padding: 12,
    },
    messageContentWrapper: {
        width: '100%',
    },
    image: {
        marginRight: 15,
    },
    imageWrapper: {
        display: 'flex',
    },
});

type Style = WithStyles<typeof styles>;

interface IProps {
    title: string;
    image?: string;
    read: boolean;
    date: string;
    content: string;
    fDelete: VoidFunction;
    height: (height: number) => void;
}

class Message extends React.PureComponent<IProps & Style> {
    private node: HTMLDivElement | null;

    public componentDidMount = () =>
        this.props.height(this.node ? this.node.getBoundingClientRect().height : 0);

    public render(): React.ReactNode {
        const {fDelete, classes, title, date, content, image, read} = this.props;
        const containerStyle: React.CSSProperties = {display: 'flex', transition: 'all 3s linear'};

        if (read) {
            containerStyle.borderTop = '0px solid black';
            containerStyle.padding = '16px';
        } else {
            containerStyle.borderTop = '5px solid orange';
            containerStyle.padding = '11px 16px 16px 16px';
        }

        return (
            <div className={`${classes.wrapperPadding} message`} ref={(ref) => (this.node = ref)}>
                <Container style={containerStyle}>
                    <div className={classes.imageWrapper}>
                        <img
                            src={image}
                            alt="app logo"
                            width="70"
                            height="70"
                            className={classes.image}
                        />
                    </div>
                    <div className={classes.messageContentWrapper}>
                        <div className={classes.header}>
                            <Typography
                                className={`${classes.headerTitle} title`}
                                variant="headline">
                                {title}
                            </Typography>
                            <Typography variant="body1" className="date">
                                <TimeAgo date={date} />
                            </Typography>
                            <IconButton onClick={fDelete} className={`${classes.trash} delete`}>
                                <Delete />
                            </IconButton>
                        </div>
                        <Typography component="p" className="content">
                            {content}
                        </Typography>
                    </div>
                </Container>
            </div>
        );
    }
}

export default withStyles(styles)<IProps>(Message);