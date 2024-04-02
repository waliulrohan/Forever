
import { Photo, StarOutline, SendOutlined, InsertDriveFileOutlined, DeleteOutlined,
    MailOutlined } from '@mui/icons-material';

export const SIDEBAR_DATA = [
    {
        name: 'inbox',
        title: 'Inbox',
        icon: Photo,
        route:"inbox",
 
    },
    {
        name: 'starred',
        title: 'Starred',
        icon: StarOutline,
        route:"starred",
    },
    {
        name: 'sent',
        title: 'Sent',
        icon: SendOutlined,
        route:"sent",
    },
    // {
    //     name: 'drafts',
    //     title: 'Drafts',
    //     icon: InsertDriveFileOutlined,
    //     route:"draft",
    // },
    {
        name: 'bin',
        title: 'Bin',
        icon: DeleteOutlined,
        route:"bin",
    },
    // {
    //     name: 'allMail',
    //     title: 'All Mail',
    //     icon: MailOutlined,
    //     route:"allMail",
    // },
];