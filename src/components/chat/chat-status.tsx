"use client";
import React, { useEffect, useState } from 'react';

export enum WsConnectStatus {
    Idle = 'idle',
    Connecting = 'connecting',
    Open = 'open',
    Reconnecting = 'reconnecting',
    Closing = 'closing',
    Closed = 'closed',
    Error = 'error',
}

interface ChatStatusProps {
    status: WsConnectStatus;
    className?: string;
    labelOverride?: string;
    showLabel?: boolean;
    dotSizeRem?: number;
}

const STATUS_DISPLAY: Record<WsConnectStatus, { text: string; color: string; pulse?: boolean; variant?: 'outline' | 'solid' }> = {
    [WsConnectStatus.Idle]: { text: 'Idle', color: '#9CA3AF' }, // gray-400
    [WsConnectStatus.Connecting]: { text: 'Connecting…', color: '#3B82F6', pulse: true }, // blue-500
    [WsConnectStatus.Open]: { text: 'Connected', color: '#10B981' }, // emerald-500
    [WsConnectStatus.Reconnecting]: { text: 'Reconnecting…', color: '#F59E0B', pulse: true }, // amber-500
    [WsConnectStatus.Closing]: { text: 'Closing…', color: '#D97706', pulse: true }, // amber-600
    [WsConnectStatus.Closed]: { text: 'Disconnected', color: '#6B7280' }, // gray-500
    [WsConnectStatus.Error]: { text: 'Error', color: '#EF4444', pulse: true }, // red-500
};

let stylesInjected = false;
function ensureStyles() {
    if (stylesInjected) return;
    const css = `
    @keyframes chat-status-pulse {
        0% { transform: scale(1); opacity: .85; }
        50% { transform: scale(1.45); opacity: .35; }
        100% { transform: scale(1); opacity: .85; }
    }
    .chat-status-root {
        --chat-status-size: .75rem;
        --chat-status-color: #9CA3AF;
        display: inline-flex;
        align-items: center;
        gap: .5rem;
        font-size: .75rem;
        line-height: 1;
        font-weight: 500;
        font-family: system-ui, sans-serif;
        user-select: none;
    }
    .chat-status-dot-wrap {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: var(--chat-status-size);
        height: var(--chat-status-size);
        color: var(--chat-status-color);
    }
    .chat-status-dot {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: var(--chat-status-color);
        box-shadow: 0 0 0 1px rgba(0,0,0,.15), 0 0 0 3px rgba(255,255,255,.6) inset;
    }
    .chat-status-pulse::after {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 50%;
        animation: chat-status-pulse 1.4s ease-in-out infinite;
        background: currentColor;
        filter: blur(1px);
        opacity: .55;
    }
    .chat-status-label {
        white-space: nowrap;
        letter-spacing: .25px;
    }
    /* Status color classes */
    .chat-status-color-idle { --chat-status-color: #9CA3AF; }
    .chat-status-color-connecting { --chat-status-color: #3B82F6; }
    .chat-status-color-open { --chat-status-color: #10B981; }
    .chat-status-color-reconnecting { --chat-status-color: #F59E0B; }
    .chat-status-color-closing { --chat-status-color: #D97706; }
    .chat-status-color-closed { --chat-status-color: #6B7280; }
    .chat-status-color-error { --chat-status-color: #EF4444; }
    `;
    const el = document.createElement('style');
    el.setAttribute('data-chat-status-styles', 'true');
    el.textContent = css;
    document.head.appendChild(el);
    stylesInjected = true;
}

// Dynamically create (or reuse) a size class without inline style attributes
function ensureSizeClass(sizeRem: number) {
    const className = `chat-status-size-${sizeRem.toString().replace('.', '_')}`;
    if (document.head.querySelector(`style[data-chat-status-size='${className}']`)) return className;
    const el = document.createElement('style');
    el.setAttribute('data-chat-status-size', className);
    el.textContent = `.${className} { --chat-status-size: ${sizeRem}rem; }`;
    document.head.appendChild(el);
    return className;
}

export const ChatStatus: React.FC<ChatStatusProps> = ({
    status,
    className = '',
    labelOverride,
    showLabel = true,
    dotSizeRem = 0.75,
}) => {
    const [sizeClass, setSizeClass] = useState<string>('');

    useEffect(() => {
        ensureStyles();
        setSizeClass(ensureSizeClass(dotSizeRem));
    }, [dotSizeRem]);

    const meta = STATUS_DISPLAY[status] ?? STATUS_DISPLAY[WsConnectStatus.Idle];
    const label = labelOverride || meta.text;

    const colorClass = `chat-status-color-${status.toLowerCase()}`;

    return (
        <span
            className={`chat-status-root ${colorClass} ${sizeClass} ${className}`.trim()}
            role="status"
            aria-live="polite"
            aria-label={label}
            data-status={status}
        >
            {showLabel && <span className="chat-status-label">{label}</span>}

            <span
                className={`chat-status-dot-wrap ${meta.pulse ? 'chat-status-pulse' : ''}`}
            >
                <span className="chat-status-dot" />
            </span>
        </span>
    );
};