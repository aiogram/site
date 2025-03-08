---
layout: home
title: aiogram
---

# aiogram

A modern and fully asynchronous framework for Telegram Bot API written in Python using asyncio and aiohttp.

## Features

- **Asynchronous**: Built with asyncio, offering superior performance for handling concurrent requests
- **Type Hints**: Comprehensive type hinting support for better code assistance in IDEs
- **Pythonic**: Intuitive API design that follows Python best practices
- **Feature-rich**: Implements all Telegram Bot API features
- **Middleware**: Flexible middleware system for request processing
- **Powerful Routers**: Advanced routing system for organizing commands and message handlers
- **FSM**: Built-in Finite State Machine for complex conversation flows
- **Filters**: Extensible filters system for handling specific messages and callbacks

## Quick Start

```python
import asyncio
from os import getenv

from aiogram import Bot, Dispatcher
from aiogram.filters import Command
from aiogram.types import Message

TOKEN = getenv("BOT_TOKEN")

dp = Dispatcher()


# Command handler
@dp.message(Command("start"))
async def command_start_handler(message: Message) -> None:
    await message.answer("Hello! I'm a bot created with aiogram.")


# Run the bot
async def main() -> None:
    bot = Bot(token=TOKEN)
    await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())
```

[Documentation →](https://docs.aiogram.dev){: .btn .btn-primary}
[View on GitHub →](https://github.com/aiogram/aiogram){: .btn .btn-secondary} 