import { useState } from 'react';
import { 
    Box, 
    TextField, 
    Button, 
    Paper, 
    Typography, 
    List, 
    ListItem, 
    ListItemText,
    Alert,
    CircularProgress
} from '@mui/material';
import { splitMessage } from '../services/api';
import type { SmsRequest } from '../types/sms';

const MAX_SMS_LENGTH = 160;

export const SmsForm = () => {
    const [message, setMessage] = useState('');
    const [splitMessages, setSplitMessages] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const request: SmsRequest = { message };
            const result = await splitMessage(request);
            setSplitMessages(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    const estimatedParts = Math.ceil(message.length / (MAX_SMS_LENGTH - 20)); // 20 chars for suffix
    const characterCount = message.length;

    return (
        <Box sx={{ 
            width: '100%',
            maxWidth: { xs: '100%', sm: 600 },
            mx: 'auto',
            mt: { xs: 2, sm: 4 },
            px: { xs: 1, sm: 2 },
            display: 'flex',
            flexDirection: 'column',
            minHeight: 'calc(100vh - 64px)' // Subtract header height
        }}>
            <Paper elevation={3} sx={{ 
                p: { xs: 2, sm: 3 },
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1
            }}>
                <Typography 
                    variant="h5" 
                    component="h1" 
                    gutterBottom
                    sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}
                >
                    SMS Splitter
                </Typography>
                
                <form onSubmit={handleSubmit} style={{ marginBottom: 'auto' }}>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        margin="normal"
                        variant="outlined"
                        required
                        disabled={loading}
                        helperText={`${characterCount} characters (estimated ${estimatedParts} part${estimatedParts !== 1 ? 's' : ''})`}
                    />
                    
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary"
                        fullWidth
                        disabled={!message.trim() || loading}
                        sx={{ 
                            mt: 2,
                            py: { xs: 1, sm: 1.5 }
                        }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Split Message'}
                    </Button>
                </form>

                {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {error}
                    </Alert>
                )}

                {splitMessages.length > 0 && (
                    <Box sx={{ 
                        mt: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: 1
                    }}>
                        <Typography 
                            variant="h6" 
                            gutterBottom
                            sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}
                        >
                            Split Messages ({splitMessages.length} part{splitMessages.length !== 1 ? 's' : ''}):
                        </Typography>
                        <Box sx={{ 
                            flexGrow: 1,
                            overflowY: 'auto',
                            minHeight: 0,
                            '&::-webkit-scrollbar': {
                                width: '8px',
                            },
                            '&::-webkit-scrollbar-track': {
                                background: '#f1f1f1',
                                borderRadius: '4px',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                background: '#888',
                                borderRadius: '4px',
                            },
                        }}>
                            <List sx={{ py: 0 }}>
                                {splitMessages.map((msg, index) => (
                                    <ListItem 
                                        key={index}
                                        component={Paper}
                                        variant="outlined"
                                        sx={{ 
                                            mb: 1,
                                            p: { xs: 1.5, sm: 2 }
                                        }}
                                    >
                                        <ListItemText 
                                            primary={msg}
                                            secondary={`Part ${index + 1} of ${splitMessages.length} (${msg.length} characters)`}
                                            sx={{ 
                                                wordBreak: 'break-all',
                                                '& .MuiListItemText-primary': {
                                                    fontSize: { xs: '0.875rem', sm: '1rem' }
                                                },
                                                '& .MuiListItemText-secondary': {
                                                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                                                }
                                            }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                        <Button
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            sx={{ mt: 2 }}
                            onClick={() => {
                                setSplitMessages([]);
                                setMessage('');
                            }}
                        >
                            Clear Messages
                        </Button>
                    </Box>
                )}
            </Paper>
        </Box>
    );
};